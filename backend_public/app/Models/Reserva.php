<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $table = "reserva";
    public $timestamps = false;
    protected $primaryKey = 'id_reserva';

    public function restaurante()
    {
        return $this->belongsTo(Restaurante::class, 'id_restaurante');
    }

    public function comentario()
    {
        return $this->hasOne(Comentario::class,"id_comentario");
    }


}
