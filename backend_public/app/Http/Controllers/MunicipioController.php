<?php

namespace App\Http\Controllers;

use App\Models\Municipio;
use Illuminate\Http\Request;

class MunicipioController extends Controller
{
    function showAll()
    {
        $municipios = Municipio::all();
        return $municipios->toJson();
    }

    function showMunicipios()
    {
        $municipios = Municipio::all()->take(15);
        return $municipios->toJson();
    }
}
