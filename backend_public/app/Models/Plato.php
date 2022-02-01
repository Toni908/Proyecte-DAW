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
}
