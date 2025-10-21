<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parrainage extends Model
{
    protected $table = 'parrainage';
    protected $primaryKey = 'id_parrainage';
    public $timestamps = false;

    protected $fillable = ['id_parrain', 'id_filleul', 'recompense_attribuee', 'points_gagnes'];

    public function parrain()
    {
        return $this->belongsTo(Utilisateur::class, 'id_parrain');
    }

    public function filleul()
    {
        return $this->belongsTo(Utilisateur::class, 'id_filleul');
    }
}
