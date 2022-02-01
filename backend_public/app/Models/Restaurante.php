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
        return $this->hasMany(Carta::class);
    }

    public function localidad()
    {
        return $this->belongsTo(Localidad::class, 'id_localidad');
    }

    public function etiquetas()
    {
        return $this->belongsToMany(Etiquetas::class, 'restaurante_etiquetas');
    }

    public function imgs()
    {
        return $this->hasMany(IMG::class);
    }

    public function periodos()
    {
        return $this->hasMany(Periodo::class);
    }
}
