<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $table = 'commande';
    protected $primaryKey = 'id_commande';
    public $timestamps = false;

    protected $fillable = [
        'id_utilisateur', 'date_commande', 'montant_total', 'points_gagnes',
        'type_service', 'heure_arrivee', 'statut', 'numero_commande'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur');
    }

    public function lignes()
    {
        return $this->hasMany(LigneCommande::class, 'id_commande');
    }

    public function paiement()
    {
        return $this->hasOne(Paiement::class, 'id_commande');
    }

    public function livraison()
    {
        return $this->hasOne(Livraison::class, 'id_commande');
    }
}
