<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    protected $table = 'employe';
    protected $primaryKey = 'id_employe';
    public $timestamps = false;

    protected $fillable = ['id_utilisateur', 'poste', 'date_embauche', 'salaire', 'est_actif'];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur');
    }
}
