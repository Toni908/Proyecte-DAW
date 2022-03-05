<?php

namespace App\Http\Controllers;

use App\Models\User_Account;
use Illuminate\Http\Request;

class UseracountController extends Controller
{
    public function show($id)
    {
        $restaurant = User_Account::find($id);
        return $restaurant->toJson(JSON_PRETTY_PRINT);
    }

    public function showAdmin()
    {
        $restaurants = User_Account::all()->where("admin","==",true);
        return $restaurants->toJson(JSON_PRETTY_PRINT);
    }

    public function showAll()
    {
        $restaurants = User_Account::all();
        return $restaurants->toJson(JSON_PRETTY_PRINT);
    }
}
