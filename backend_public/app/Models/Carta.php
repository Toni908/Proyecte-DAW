<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carta extends Model
{
    use HasFactory;

    protected $table = "carta";
    public $timestamps = false;
    protected $primaryKey = 'id_carta';

    public function categorias()
    {
        return $this->hasMany(Categoria::class,"id_categoria");
    }

    public function restaurante()
    {
        return $this->belongsTo(Restaurante::class, 'id_restaurante');
    }
}
