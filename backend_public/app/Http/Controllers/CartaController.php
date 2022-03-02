<?php

namespace App\Http\Controllers;

use App\Models\Carta;
use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Plato;
use Illuminate\Http\Request;

class CartaController extends Controller
{
    public function show($id): array
    {
        $carta = Carta::first()->select("carta.*")
            ->join('restaurante', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
            ->where("carta.visible","=",1)
            ->where("restaurante.id_restaurante","=",$id)
            ->groupBy("carta.id_carta")
            ->get()->toArray();
        $platos = $this->platoWithCategory($id);
        $categories = $this->categoryCartaActive($id);

        // INSTANCIAR CADA CATEGORIA CON UNA LISTA DE PLATOS
        for ($c = 0; $c < count($categories); $c++) {
            $categories[$c]["platos"] = [];
        }

        for ($p = 0; $p < count($platos); $p++) {
            for ($c = 0; $c < count($categories); $c++) {
                if ($platos[$p]["id_categoria"]===$categories[$c]["id_categoria"]) {
                    array_push($categories[$c]["platos"],$platos[$p]);
                }
            }
        }

        $fullCarta["carta"] = head($carta);
        $fullCarta["carta"]["categorias"] = $categories;
        return $fullCarta;
    }

    public function categoryCartaActive($id) {
        $categories = Categoria::select("categoria_platos.id_categoria","categoria_platos.nombre")
            ->join("carta","carta.id_carta","=","categoria_platos.id_carta")
            ->join("restaurante","restaurante.id_restaurante","=","carta.id_restaurante")
            ->where("carta.visible","=",1)
            ->where("restaurante.id_restaurante","=",$id)
            ->groupBy("categoria_platos.id_categoria")
            ->get()->toArray();
        return $categories;
    }

    public function platoWithCategory($id): array
    {
        $platos = Plato::with("ingredientes","alergeno")->select("platos.*")
            ->join("categoria_platos","categoria_platos.id_categoria","=","platos.id_categoria")
            ->join("carta","carta.id_carta","=","categoria_platos.id_carta")
            ->join("restaurante","restaurante.id_restaurante","=","carta.id_restaurante")
            ->where("carta.visible","=",1)
            ->where("restaurante.id_restaurante","=",$id)
            ->groupBy("platos.id_plato")
            ->get()->toArray();
        return $platos;
    }

}
