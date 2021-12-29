<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AuthController;
use \App\Http\Controllers\PizzaController;
use \App\Http\Controllers\IngredientController;
use \App\Http\Controllers\OrderController;

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

    Route::group(["middleware" => "auth:api"], function () {
        Route::post("/create", [PizzaController::class, "store"])->name("store");
        Route::delete("/delete/{id}", [PizzaController::class, "destroy"])->name("destroy");
        Route::patch("/update/{id}", [PizzaController::class, "update"])->name("update");
    });
});

Route::group(["prefix" => "ingredient", "name" => "ingredient"], function () {
    Route::get("/", [IngredientController::class, "index"])->name("index");
    Route::get("/{id}", [IngredientController::class, "show"])->name("show");

    Route::group(["middleware" => "auth:api"], function () {
        Route::post("/create", [IngredientController::class, "store"])->name("store");
        Route::delete("/delete/{id}", [IngredientController::class, "destroy"])->name("destroy");
        Route::patch("/update/{id}", [IngredientController::class, "update"])->name("update");
    });

});

Route::group(["prefix" => "order", "name" => "order"], function () {
    Route::group(["middleware" => "auth:api"], function () {
        Route::get("/", [OrderController::class, "index"])->name("index");
        Route::get("/ordered", [OrderController::class, "ordered"])->name("ordered");
        Route::get("/accepted", [OrderController::class, "accepted"])->name("accepted");
        Route::get("/cooked", [OrderController::class, "cooked"])->name("cooked");
        Route::get("/delivered", [OrderController::class, "delivered"])->name("delivered");

        Route::post("/accept/{id}", [OrderController::class, "accept"])->name("accept");
        Route::post("/cook/{id}", [OrderController::class, "cook"])->name("cook");
        Route::post("/deliver/{id}", [OrderController::class, "deliver"])->name("deliver");

        Route::delete("/delete/{id}", [OrderController::class, "destroy"])->name("destroy");
        Route::patch("/update", [OrderController::class, "update"])->name("update");
    });

    Route::post("/create", [OrderController::class, "store"])->name("store");
    Route::get("/{id}", [OrderController::class, "show"])->name("show");
});

