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

    public function periodo()
    {
        return $this->belongsTo(periodo::class, 'id_periodo');
    }

}
