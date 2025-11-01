<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $table = 'paiement';
    protected $primaryKey = 'id_paiement';
    public $timestamps = false;

    protected $fillable = ['id_commande', 'montant', 'methode_paiement', 'statut_paiement', 'transaction_id'];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }
}
