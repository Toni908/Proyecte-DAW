<?php

namespace App\Http\Controllers;

use App\Models\Etiquetas;
use Illuminate\Http\Request;

class EtiquetasController extends Controller
{
    function showAll()
    {
        $periodo = Etiquetas::all();
        return $periodo->toJson();
    }
}
