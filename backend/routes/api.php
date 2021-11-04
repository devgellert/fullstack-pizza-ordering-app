<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AuthController;
use \App\Http\Controllers\PizzaController;
use \App\Http\Controllers\IngredientController;

Route::group(["prefix" => "auth", "name" => "auth"], function () {
    Route::post("/login", [AuthController::class, "login"])->name("login");
    Route::post("/register", [AuthController::class, "register"])->name("register");

    Route::group(["middleware" => "auth:api"], function () {
        Route::post("/refresh", [AuthController::class, "refresh"])->name("refresh");
        Route::post("/logout", [AuthController::class, "logout"])->name("logout");
    });
});

Route::group(["prefix" => "pizza", "name" => "pizza"], function () {
    Route::get("/", [PizzaController::class, "index"])->name("index");
    Route::get("/{id}", [PizzaController::class, "show"])->name("show");

    //auth
    Route::post("/create", [PizzaController::class, "store"])->name("store");
    Route::delete("/delete/{id}", [PizzaController::class, "destroy"])->name("destroy");
    Route::patch("/update/{id}", [PizzaController::class, "update"])->name("update");
});


Route::group(["prefix" => "ingredient", "name" => "ingredient"], function () {
    Route::get("/", [IngredientController::class, "index"])->name("index");
    Route::get("/{id}", [IngredientController::class, "show"])->name("show");

    //auth
    Route::post("/create", [IngredientController::class, "store"])->name("store");
    Route::delete("/delete/{id}", [IngredientController::class, "destroy"])->name("destroy");
    Route::patch("/update/{id}", [IngredientController::class, "update"])->name("update");
});

