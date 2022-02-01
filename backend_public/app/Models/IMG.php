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

    public function restaurante()
    {
        return $this->belongsTo(Restaurante::class, 'id_restaurante');
    }
}
