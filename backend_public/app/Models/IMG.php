<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IMG extends Model
{
    use HasFactory;

    protected $table = "img";
    public $timestamps = false;
    protected $primaryKey = 'id_img';

}
