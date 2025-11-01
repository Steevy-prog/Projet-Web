<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $table = 'categorie';
    protected $primaryKey = 'id_categorie';
    public $timestamps = false;

    protected $fillable = ['nom_categorie', 'description', 'ordre_affichage', 'active'];

    public function articles()
    {
        return $this->hasMany(Article::class, 'id_categorie');
    }
}
