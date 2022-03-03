<?php

namespace App\Http\Controllers;

use App\Models\Periodo;

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
