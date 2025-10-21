<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    protected $table = 'evenement';
    protected $primaryKey = 'id_evenement';
    public $timestamps = false;

    protected $fillable = [
        'titre', 'description', 'date_debut', 'date_fin', 'type_evenement',
        'image_url', 'recompense_points', 'nombre_participants_max', 'est_actif'
    ];

    public function participations()
    {
        return $this->hasMany(Participation::class, 'id_evenement');
    }
}
