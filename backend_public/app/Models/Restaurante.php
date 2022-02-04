<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurante extends Model
{
    use HasFactory;

    protected $table = "restaurante";
    public $timestamps = false;
    protected $primaryKey = 'id_restaurante';

    public function cartas()
    {
        return $this->hasMany(Carta::class,"id_carta");
    }

    public function localidad()
    {
        return $this->belongsTo(Localidad::class, 'id_localidad');
    }

    public function etiquetas()
    {
        return $this->belongsToMany(Etiquetas::class, 'restaurante_etiquetas',"id_restaurante","id_restaurante");
    }

    public function imgs()
    {
        return $this->hasMany(IMG::class,"id_img");
    }

    public function periodos()
    {
        return $this->hasMany(Periodo::class,"id_periodo");
    }

    public function user()
    {
        return $this->belongsTo(User_Account::class, 'id_user');
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class,"id_reserva");
    }
}
