<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etiquetas extends Model
{
    use HasFactory;

    protected $table = "etiquetas";
    public $timestamps = false;
    protected $primaryKey = 'id_etiqueta';

}
