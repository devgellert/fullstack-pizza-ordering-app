<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AuthController;

Route::group(["prefix" => "auth", "name" => "auth"], function () {
    Route::post("/login", [AuthController::class, "login"])->name("login");
    Route::post("/register", [AuthController::class, "register"])->name("register");

    Route::group(["middleware" => "auth:api"], function () {
        Route::post("/refresh", [AuthController::class, "refresh"])->name("refresh");
        Route::post("/logout", [AuthController::class, "logout"])->name("logout");
    });
});
