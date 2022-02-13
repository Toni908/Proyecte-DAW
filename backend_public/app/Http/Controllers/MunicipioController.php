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
}
