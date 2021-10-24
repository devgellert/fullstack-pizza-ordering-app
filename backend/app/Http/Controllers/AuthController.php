<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $token = Auth::attempt($request->all(["email", "password"]));
        if(!$token) {
            return Response::json(["message" => "Failed to log in."], 401);
        }
        return $this->createTokenView($token);
    }

    public function register(Request $request)
    {
        $user = new User($request->all(["email", "name", "password"]));
        $user->hashAndSetPassword($request->request->get("password"));
        $user->save();
        return $user;
    }

    public function logout()
    {
        Auth::logout();
        return Response::json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        $token = Auth::refresh();
        return $this->createTokenView($token);
    }

    private function createTokenView(string $token) {
        return [
            "token" => $token
        ];
    }
}
