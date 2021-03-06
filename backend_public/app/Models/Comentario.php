<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;

    protected $table = "comentarios";
    public $timestamps = false;
    protected $primaryKey = 'id_comentario';

    public function reserva()
    {
        return $this->hasOne(Reserva::class, 'id_resereva');
    }
}
