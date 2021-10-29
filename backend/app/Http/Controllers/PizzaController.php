<?php

namespace App\Http\Controllers;

use App\Models\Pizza;
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
        return Pizza::all();
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
            'ingredients' => 'required|string|min:10|max:12',
            'price' => 'required|integer|min:3|max:255',
            'size' => 'required|integer|min:1000|max:10000',
        ]);


        Pizza::create($validated);
        return Response::noContent(201);
    }

    /*
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function show($id)
   {
       return Pizza::find($id);
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
            'ingredients' => 'required|string|min:10|max:12',
            'price' => 'required|integer|min:3|max:255',
            'size' => 'required|integer|min:1000|max:10000',
        ]);

        $pizza->update($validated);
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
