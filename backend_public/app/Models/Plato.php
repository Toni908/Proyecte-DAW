<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plato extends Model
{
    use HasFactory;

    protected $table = "platos";
    public $timestamps = false;
    protected $primaryKey = 'id_plato';

    public function alergeno()
    {
        return $this->belongsToMany(Alergeno::class, 'platos_alergenos',"id_plato","id_alergeno");
    }

    public function ingredientes()
    {
        return $this->belongsToMany(Ingrediente::class, 'platos_ingredientes',"id_plato","id_ingrediente");
    }

    public function categorias()
    {
        return $this->belongsTo(Categoria::class, 'id_categoria');
    }
}
