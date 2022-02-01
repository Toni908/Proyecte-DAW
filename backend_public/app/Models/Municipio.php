<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    use HasFactory;

    protected $table = "municipio";
    public $timestamps = false;
    protected $primaryKey = 'nombre_municipio';
    protected $keyType = 'string';

    public function localidad()
    {
        return $this->belongsTo(Localidad::class, 'id_localidad');
    }
}
