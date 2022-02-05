<?php

namespace App\Http\Controllers;

use App\Models\Horario;
use Illuminate\Http\Request;

class HorarioController extends Controller
{
    public function show($id) {
        $restaurante = Horario::with('periodo')->find($id);
        return json_decode(json_encode($restaurante), true);
    }
}
