<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    protected $table = 'commentaire';
    protected $primaryKey = 'id_commentaire';
    public $timestamps = false;

    protected $fillable = ['id_commande', 'contenu', 'note', 'est_visible'];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }
}
