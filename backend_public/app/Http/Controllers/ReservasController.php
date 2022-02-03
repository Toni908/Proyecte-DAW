<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Restaurante;

class ReservasController extends Controller
{
    public function show($id)
    {
        $restaurant = Reserva::find($id);
        return $restaurant->toJson(JSON_PRETTY_PRINT);
    }

    public function create(Reserva $reserva)
    {
        $restaurant = Restaurante::find($reserva->restaurante);
        if ($restaurant!=null) {
            $resultAforo = ($restaurant->aforo)-($reserva->personas);
            if ($resultAforo>=0) {
                $reserva->save();
            }
        }
    }
}
