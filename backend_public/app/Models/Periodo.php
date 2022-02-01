<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periodo extends Model
{
    use HasFactory;

    protected $table = "periodo";
    public $timestamps = false;
    protected $primaryKey = 'id_periodo';

    public function restaurante()
    {
        return $this->belongsTo(Restaurante::class, 'id_restaurante');
    }

    public function horario()
    {
        return $this->hasMany(Horario::class);
    }
}
