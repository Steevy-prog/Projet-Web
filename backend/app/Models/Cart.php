<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    // Table name
    protected $table = 'cart';

    // Primary key
    protected $primaryKey = 'id_cart';

    // Disable default timestamps (created_at, updated_at)
    public $timestamps = false;

    // Fillable fields
    protected $fillable = [
        'id_utilisateur',
        'id_article',
        'quantity',
        'date_added',
    ];

    // Relationship to the user
    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur');
    }

    // Relationship to the article (menu item)
    public function article()
    {
        return $this->belongsTo(Article::class, 'id_article');
    }
}
