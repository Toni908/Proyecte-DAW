<?php

namespace App\Http\Controllers;

use App\Models\Horario;
use App\Models\Periodo;
use App\Models\Restaurante;
use Illuminate\Http\Request;

class HorarioController extends Controller
{
    function show($id) {
        // SHOW HORARIOS FROM RESTAURANT
        $ldate = date('Y-m-d');
        $periodo = Periodo::all()->where('id_restaurante',$id)->where('fecha_inicio','<=',$ldate)->where('fecha_fin','>=',$ldate)->toArray();
        if ($periodo!=[]) {
            $horario = Horario::all()->where('id_periodo',$periodo[array_keys($periodo)[0]]['id_periodo']);
            return $horario;
        }
        return null;
    }
}
