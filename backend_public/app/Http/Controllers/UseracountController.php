<?php

namespace App\Http\Controllers;

use App\Models\User_Account;
use Illuminate\Http\Request;

class UseracountController extends Controller
{
    public function showUser($id)
    {
        $restaurant = User_Account::find($id);
        return $restaurant->toJson(JSON_PRETTY_PRINT);
    }

    public function showUserWhereIsAdmin()
    {
        $restaurants = User_Account::all()->where("admin","==",true);
        return $restaurants->toJson(JSON_PRETTY_PRINT);
    }

    public function showUsers()
    {
        $restaurants = User_Account::all();
        return $restaurants->toJson(JSON_PRETTY_PRINT);
    }
}
