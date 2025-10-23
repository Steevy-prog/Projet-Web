<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['sender_id', 'receiver_id', 'message', 'is_read'];

    public function sender()
    {
        return $this->belongsTo(Utilisateur::class, 'sender_id','id_utilisateur');
    }

    public function receiver()
    {
        return $this->belongsTo(Utilisateur::class, 'receiver_id','id_utilisateur');
    }
}
