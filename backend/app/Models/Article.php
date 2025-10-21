<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $table = 'article';
    protected $primaryKey = 'id_article';
    public $timestamps = false;

    protected $fillable = [
        'nom', 'description', 'prix', 'id_categorie', 'disponible',
        'image_url', 'est_promotion', 'stock_disponible'
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }

    public function lignesCommande()
    {
        return $this->hasMany(LigneCommande::class, 'id_article');
    }
}
