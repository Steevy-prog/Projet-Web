<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Utilisateur; // Assuming Utilisateur is your User/Client model
use App\Models\Employee;    // Assuming Employee is your Employee model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;
use App\Events\MessageSent; // Import the new event

class MessageController extends BaseController
{
    // NOTE: Your previous controller used 'users,id' for exists validation.
    // You must adapt this to your actual User/Employee models and keys.

    public function __construct()
    {
        // Ensure authentication is working correctly for API guard
        $this->middleware('auth:api');
    }

    /**
     * Get a list of all contacts/conversations for the authenticated user/employee.
     */
    public function indexConversations()
    {
        $authId = Auth::guard('api')->id();

        // Find all unique user IDs that the current user has exchanged messages with
        $contactIds = Message::where('sender_id', $authId)
                             ->orWhere('receiver_id', $authId)
                             ->pluck('sender_id')
                             ->merge(Message::where('sender_id', $authId)
                                             ->orWhere('receiver_id', $authId)
                                             ->pluck('receiver_id'))
                             ->unique()
                             ->filter(fn($id) => $id !== $authId);

        // Fetch all contacts (Users and Employees) based on the contact IDs.
        // NOTE: This assumes a simple structure where all contacts are in one place
        // or can be easily distinguished. For simplicity, we assume all are 'Utilisateur'.
        $contacts = Utilisateur::whereIn('id_utilisateur', $contactIds)->get();

        $conversations = $contacts->map(function($contact) use ($authId) {
            $lastMessage = Message::where(function($query) use ($authId, $contact) {
                $query->where('sender_id', $authId)->where('receiver_id', $contact->id_utilisateur);
            })->orWhere(function($query) use ($authId, $contact) {
                $query->where('sender_id', $contact->id_utilisateur)->where('receiver_id', $authId);
            })
            ->orderByDesc('created_at')
            ->first();

            $unreadCount = Message::where('sender_id', $contact->id_utilisateur) // Messages *from* contact
                                  ->where('receiver_id', $authId)            // Messages *to* current user
                                  ->where('is_read', false)
                                  ->count();

            return [
                'id'              => "conv_{$contact->id_utilisateur}", // Virtual ID for frontend
                'userId'          => $authId,
                'userName'        => Auth::user()->nom . ' ' . Auth::user()->prenom,
                'employeeId'      => $contact->id_utilisateur, // This is a generic contact ID
                'employeeName'    => $contact->nom . ' ' . $contact->prenom, // This is a generic contact name
                'lastMessage'     => $lastMessage ? $lastMessage->message : '',
                'lastMessageTime' => $lastMessage ? $lastMessage->created_at->toISOString() : '',
                'unreadCount'     => $unreadCount,
            ];
        });

        return response()->json($conversations);
    }

    /**
     * Get the messages for a specific conversation with a contact ID.
     */
    public function getMessagesByContactId(string $contactId)
    {
        $authId = Auth::guard('api')->id();
        $contactId = (int) $contactId; // Ensure it's an integer ID

        $messages = Message::where(function($query) use ($authId, $contactId) {
            $query->where('sender_id', $authId)
                  ->where('receiver_id', $contactId);
        })->orWhere(function($query) use ($authId, $contactId) {
            $query->where('sender_id', $contactId)
                  ->where('receiver_id', $authId);
        })
        ->with(['sender', 'receiver'])
        ->orderBy('created_at', 'asc')
        ->get();

        // Mark messages as read (messages *from* the contact *to* the auth user)
        Message::where('sender_id', $contactId)
            ->where('receiver_id', $authId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json($messages);
    }

    /**
     * Store a new message and broadcast it.
     */
    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|integer',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => Auth::guard('api')->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
            'is_read' => false, // New messages start as unread
        ]);

        $message->load(['sender', 'receiver']);

        // ✨ Broadcast the new message!
        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message, 201);
    }
}
