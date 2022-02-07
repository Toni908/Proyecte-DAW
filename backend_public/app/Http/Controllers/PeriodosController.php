<?php

namespace App\Http\Controllers;

use App\Models\Horario;
use App\Models\Periodo;
use App\Models\Restaurante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class PeriodosController extends Controller
{
    function show($id) {
        // SHOW HORARIOS FROM RESTAURANT
        $ldate = date('Y-m-d');

        // COGER UN PERIODO PERO DE LA FECHA ACTUAL
        $periodo = Periodo::all()->where('id_restaurante',$id)->where('fecha_inicio','<=',$ldate)->where('fecha_fin','>',$ldate)->toArray();
        if ($periodo!=[]) {
            return $periodo;
        }
        return null;
    }
}
