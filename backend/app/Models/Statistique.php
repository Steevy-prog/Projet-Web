<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statistique extends Model
{
    protected $table = 'statistique';
    protected $primaryKey = 'id_statistique';
    public $timestamps = false;

    protected $fillable = [
        'id_utilisateur', 'total_commandes', 'total_depense',
        'total_points_gagnes', 'total_points_utilises',
        'total_parrainages', 'note_moyenne'
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur');
    }
}
