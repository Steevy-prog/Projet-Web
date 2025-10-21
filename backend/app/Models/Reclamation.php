<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reclamation extends Model
{
    protected $table = 'reclamation';
    protected $primaryKey = 'id_reclamation';
    public $timestamps = false;

    protected $fillable = [
        'id_utilisateur', 'id_commande', 'id_employe_traitement',
        'description', 'statut', 'reponse', 'priorite'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur');
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }

    public function employe()
    {
        return $this->belongsTo(Employe::class, 'id_employe_traitement');
    }
}
