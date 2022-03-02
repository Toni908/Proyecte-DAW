<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Restaurante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Nette\Utils\DateTime;

class ReservasController extends Controller
{
    public function show($id)
    {
        $reserva = Reserva::find($id);
        return $reserva->toJson(JSON_PRETTY_PRINT);
    }

    public function showAll($id) {
        $reservas = Reserva::select("reserva.*")
            ->join("restaurante","restaurante.id_restaurante","=","reserva.id_restaurante")
            ->where("restaurante.id_restaurante","=",$id)
            ->get()->toArray();
        return $reservas;
    }

    public function create(Request $request)
    {
        $reserva = new Reserva();

        $reserva->personas = $request->input('personas');
        $reserva->correo = $request->input('correo');
        $reserva->telefono = $request->input('telefono');
        $reserva->nombre = $request->input('nombre');
        $reserva->lenguaje = $request->input('lenguaje');
        $reserva->fecha = \date("Y-m-d H:i:s",strtotime($request->input('fecha')));
        $reserva->id_restaurante = $request->input('id_restaurante');


        $fecha = \date("Y-m-d H:i:s",strtotime($request->input('fecha')));

        $restaurant = Restaurante::find($reserva->id_restaurante);
        if ($restaurant!=null) {
            $resultAforo = ($restaurant->aforo)-($reserva->personas);
            if ($resultAforo>=0) {
                $reservas = $this->showDate($reserva->id_restaurante,$fecha->format("Y"),$fecha->format("m"),$fecha->format("d"),$fecha->format('H'));
                $realAforo = $reservas[0]["aforo"]+$reserva->personas;
                if ($realAforo>$restaurant->aforo) {
                    return $reservas;
                } else {
                    $reserva->save();
                    return "OKEY";
                }
            }
        }
        return "AFORO ERROR";
    }

    public function showDate($id, $day,$month,$year,$hour) {
        $date_start = date("Y-m-d H:i:s",strtotime($year."-".$month."-".$day." ".$hour.":"."00:00"));
        $date_end = date("Y-m-d H:i:s",strtotime($date_start. ' + 1 hour'));

        $reservas = Reserva::select(DB::raw('sum(reserva.personas) as aforo'))
            ->join("restaurante","restaurante.id_restaurante","=","reserva.id_restaurante")
            ->where("restaurante.id_restaurante","=",$id)
            ->WhereBetween("reserva.fecha",[$date_start,$date_end])
            ->get()->toArray();
        return $reservas;
    }

    public function login(Request $request)
    {
        $id = $request->input('id');
        $email = $request->input('email');

        $reserva = Reserva::find($id);

        if($reserva->correo === $email){
            return true;
        }else{
            return false;
        }
    }

    public function comprobate(Request $request)
    {
        $id = $request->input('id');

        $reserva = Reserva::select(DB::raw('Count(id_comentario) as coment'))
        ->join('comentarios', 'comentarios.id_reserva', '=', 'reserva.id_reserva')
        ->where('comentarios.id_reserva', '=', $id)
        ->get();

        return $reserva;
    }
}
