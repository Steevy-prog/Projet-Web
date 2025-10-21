<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $table = 'promotion';
    protected $primaryKey = 'id_promotion';
    public $timestamps = false;

    protected $fillable = [
        'titre', 'description', 'reduction', 'montant_reduction',
        'date_debut', 'date_fin', 'code_promo', 'active'
    ];
}
