<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingrediente extends Model
{
    use HasFactory;
    
    protected $table = "ingredientes";
    public $timestamps = false;
    protected $primaryKey = 'id_ingrediente';

    public function platos()
    {
        return $this->belongsToMany(Plato::class, 'platos_ingredientes');
    }
}
