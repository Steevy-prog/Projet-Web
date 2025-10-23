<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller as BaseController;

class MessageController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $userId = Auth::guard('api')->id();

        $messages = Message::where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->with(['sender', 'receiver'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($messages);
    }

    public function getConversation($userId)
    {
        $authId = Auth::guard('api')->id();

        $messages = Message::where(function($query) use ($authId, $userId) {
            $query->where('sender_id', $authId)
                  ->where('receiver_id', $userId);
        })->orWhere(function($query) use ($authId, $userId) {
            $query->where('sender_id', $userId)
                  ->where('receiver_id', $authId);
        })
        ->with(['sender', 'receiver'])
        ->orderBy('created_at', 'asc')
        ->get();

        // Mark messages as read
        Message::where('sender_id', $userId)
            ->where('receiver_id', $authId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => Auth::guard('api')->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        $message->load(['sender', 'receiver']);

        return response()->json($message, 201);
    }

    public function getUsers()
    {
        $users = User::where('id', '!=', Auth::guard('api')->id())->get();
        return response()->json($users);
    }
}
