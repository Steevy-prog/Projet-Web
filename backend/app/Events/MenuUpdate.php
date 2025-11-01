<?php

namespace App\Events;

use App\Models\Article;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MenuUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $menuItem;

    public function __construct(Article $menuItem)
    {
        $this->menuItem = $menuItem;
    }

    public function broadcastOn()
    {
        return ['menu-channel'];
    }

    public function broadcastAs()
    {
        return 'menu-updated';
    }
}
