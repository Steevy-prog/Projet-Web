<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticable;

class Utilisateur extends Authenticable implements JWTSubject
{
    protected $table = 'utilisateur';
    protected $primaryKey = 'id_utilisateur';
    public $timestamps = false;

    protected $fillable = [
        'nom', 'prenom', 'email', 'mot_de_passe', 'telephone',
        'localisation', 'points_fidelite','gamesPlayed', 'code_parrainage',
        'id_parrain', 'id_role', 'statut_compte',
        'derniere_connexion', 'date_modification'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'id_role');
    }

    public function parrain()
    {
        return $this->belongsTo(Utilisateur::class, 'id_parrain');
    }

    public function filleuls()
    {
        return $this->hasMany(Parrainage::class, 'id_parrain');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'id_utilisateur');
    }
        // JWTAuth methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }


    // Tell Laravel the custom password column name
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }
}
