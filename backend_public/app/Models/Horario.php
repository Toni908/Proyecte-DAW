<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    use HasFactory;

    protected $table = "horario";
    public $timestamps = false;
    protected $primaryKey = 'id_horario';

    public function restaurante()
    {
        return $this->belongsTo(Restaurante::class, 'id_restaurante');
    }

}
