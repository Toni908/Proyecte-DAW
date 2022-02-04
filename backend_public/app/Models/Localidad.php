<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Localidad extends Model
{
    use HasFactory;

    protected $table = "localidad";
    public $timestamps = false;
    protected $primaryKey = 'id_localidad';

    public function municipios()
    {
        return $this->hasMany(Municipio::class,"nombre_municipio");
    }

    public function restaurantes()
    {
        return $this->hasMany(Restaurante::class,"id_restaurante");
    }
}
