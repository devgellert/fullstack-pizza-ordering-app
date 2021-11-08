<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Ingredient::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
        ]);


        $ingredient = Ingredient::create($validated);
        return $ingredient;
    }

    /*
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function show($id)
   {
       return Ingredient::find($id);
   }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        /** @var Ingredient $ingredient */
        $ingredient = Ingredient::find($id);
        if (!$ingredient) {
            throw new NotFoundHttpException();
        }
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
        ]);

        $ingredient->update($validated);
        return Response::noContent(200);
    }

       /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /** @var Ingredient $ingredient */
        $ingredient = Ingredient::find($id);
        if (!$ingredient) {
            throw new NotFoundHttpException();
        }
        $ingredient->pizzas()->detach($ingredient->pizzas);
        $ingredient->delete();

        return Response::noContent(200);
    }
}
