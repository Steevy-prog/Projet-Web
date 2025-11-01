<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Utilisateur;
use App\Models\Employe;
use App\Models\Message;

class Conversation extends Model
{
    use HasFactory;

    protected $table = 'conversations';

    protected $fillable = [
        'user_id',
        'employee_id',
    ];

    /**
     * Get the user that belongs to this conversation
     */
    public function user()
    {
        return $this->belongsTo(Utilisateur::class, 'user_id');
    }

    /**
     * Get the employee that belongs to this conversation
     */
    public function employee()
    {
        return $this->belongsTo(Employe::class, 'employee_id');
    }

    /**
     * Get all messages for this conversation
     */
    public function messages()
    {
        return $this->hasMany(Message::class, 'conversation_id')->orderBy('created_at', 'asc');
    }
}
