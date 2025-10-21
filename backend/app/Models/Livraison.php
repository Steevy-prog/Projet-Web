<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Livraison extends Model
{
    protected $table = 'livraison';
    protected $primaryKey = 'id_livraison';
    public $timestamps = false;

    protected $fillable = [
        'id_commande', 'adresse_livraison', 'statut_livraison', 'id_livreur',
        'latitude', 'longitude', 'instructions_livraison'
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }
}
