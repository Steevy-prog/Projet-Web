<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Utilisateur;

class UserPointsUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    // Change $user to $payload
    public $payload;

    public function __construct(Utilisateur $user)
    {
        // Construct the payload to match the frontend's expected structure
        $this->payload = [
            'id_utilisateur'  => $user->id_utilisateur,
            'nom'             => $user->nom,
            'prenom'          => $user->prenom,
            'loyaltyPoints'   => $user->points_fidelite, // <--- **Crucial Change**
            'gamesPlayed'     => $user->jeux_joues ?? 0,
            // Include other fields your frontend expects for a full user object
        ];
    }

    public function broadcastOn(): Channel
    {
        return new Channel('leaderboard');
    }

    public function broadcastAs(): string
    {
        return 'user.points.updated';
    }

    // You must implement the broadcastWith method to send the payload directly
    public function broadcastWith(): array
    {
        return ['user' => $this->payload]; // Send the mapped payload
    }
}
