<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LigneCommande extends Model
{
    protected $table = 'ligne_commande';
    protected $primaryKey = 'id_ligne';
    public $timestamps = false;

    protected $fillable = ['id_commande', 'id_article', 'quantite', 'prix_unitaire', 'sous_total'];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }

    public function article()
    {
        return $this->belongsTo(Article::class, 'id_article');
    }
}
