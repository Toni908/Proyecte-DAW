<?php

namespace App\Http\Controllers;

use App\Models\Carta;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CartaController extends Controller
{
    public function showCard($id)
    {
        $carta = Carta::find($id);

        return $carta->toJson(JSON_PRETTY_PRINT);
    }

}
