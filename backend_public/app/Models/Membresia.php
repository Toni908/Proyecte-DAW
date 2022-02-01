<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membresia extends Model
{
    use HasFactory;

    protected $table = "membresia";
    public $timestamps = false;
    protected $primaryKey = 'id_membresia';
}
