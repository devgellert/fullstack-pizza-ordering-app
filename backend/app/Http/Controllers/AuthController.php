<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->request->get("email");
        $password = $request->request->get("password");

        /** @var User $user */
        $user = User::where("email", $email)->first();
        if(!$user)
        {
            throw new NotFoundHttpException();
        }

        if(!Hash::check($password, $user->getAttribute("password")))
        {
            return Response::make(["message" => "Password is not correct."], 403);
        }

        $token = $user->createToken("auth-token");

        auth()->setUser($user);

        return [
            "token" => $token->plainTextToken
        ];
    }

    public function register(Request $request)
    {
        $user = new User($request->request->all());
        $user->hashAndSetPassword($request->request->get("password"));
        $user->save();
        return $user;
    }

    public function logout(Request $request)
    {
        return auth()->user()->tokens()->delete();
    }
}
