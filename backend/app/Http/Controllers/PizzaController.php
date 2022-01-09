<?php

namespace App\Http\Controllers;

use App\Models\Pizza;
use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Auth;

class PizzaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Pizza::with('ingredients')->get();
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
            'price' => 'required|integer|min:1000|max:10000',
            'size' => 'required|integer|min:10|max:50',
            'ingredient' => 'nullable',
            'ingredient.*' => 'integer|distinct|exists:ingredients,id'
        ]);

        $pizza = Pizza::create($validated);
        $pizza->ingredients()->attach($request->ingredient);
        return Response::noContent(200);
    }

    /*
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function show($id)
   {
       $pizza = Pizza::find($id);
       $pizza->ingredients;
       return $pizza;
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
        /** @var Pizza $pizza */
        $pizza = Pizza::find($id);
        if (!$pizza) {
            throw new NotFoundHttpException();
        }
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'price' => 'required|integer|min:1000|max:10000',
            'size' => 'required|integer|min:10|max:50',
            'ingredient' => 'nullable',
            'ingredient.*' => 'integer|distinct|exists:ingredients,id'
        ]);

        $pizza->update($validated);
        $pizza->ingredients()->detach($pizza->ingredients);
        $pizza->ingredients()->attach($request->ingredient);
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
        /** @var Pizza $pizza */
        $pizza = Pizza::find($id);
        if (!$pizza) {
            throw new NotFoundHttpException();
        }
        $pizza->delete();

        return Response::noContent(200);
    }
}
