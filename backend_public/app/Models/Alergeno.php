<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alergeno extends Model
{
    use HasFactory;

    protected $table = "alergenos";
    public $timestamps = false;
    protected $primaryKey = 'id_alergeno';

    public function platos()
    {
        return $this->belongsToMany(Plato::class, 'platos_alergenos');
    }
}