<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participation extends Model
{
    protected $table = 'participation';
    protected $primaryKey = 'id_participation';
    public $timestamps = false;

    protected $fillable = ['id_utilisateur', 'id_evenement', 'points_gagnes', 'score', 'a_gagne'];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur');
    }

    public function evenement()
    {
        return $this->belongsTo(Evenement::class, 'id_evenement');
    }
}
