<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $table = "categoria_platos";
    public $timestamps = false;
    protected $primaryKey = 'id_categoria';

    public function platos()
    {
        return $this->hasMany(Plato::class,"id_plato");
    }

    public function carta()
    {
        return $this->belongsTo(Carta::class, 'id_carta');
    }
}
