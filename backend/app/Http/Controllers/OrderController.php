<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Auth;


class OrderController extends Controller
{
    const statuses = ['ORDERED','ACCEPTED','COOKED','DELIVERED'];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Order::all();
    }

    public function ordered()
    {
        return Order::all()->where('status', 'ORDERED');
    }

    public function accepted()
    {
        return Order::all()->where('status', 'ACCEPTED');
    }

    public function cooked()
    {
        return Order::all()->where('status', 'COOKED');
    }

    public function delivered()
    {
        return Order::all()->where('status', 'DELIVERED');
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
            'customer_name' => 'required|string|min:3|max:255',
            'customer_phone' => 'required|string|min:10|max:12',
            'destination' => 'required|string|min:3|max:255',
            'pizzas' => 'nullable',
        ]);



        $validated['status'] = 'ORDERED';

        $order = Order::create($validated);
        $order->customer_name = $validated["pizzas"];

        foreach ($validated["pizzas"] as &$pizza) {
            $order->pizzas()->attach($pizza['id'], ['count' => $pizza['piece']]);
        }

        $order->pizzas;
        return $order;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::find($id);
        $order->acceptedBy;
        $order->cookedBy;
        $order->deliveredBy;
        $order->pizzas;
        return $order;
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
        /** @var Order $order */
        $order = Order::find($id);
        if (!$order) {
            throw new NotFoundHttpException();
        }
        $validated = $request->validate(
            [
                'status' => 'required|in:'.join(",", self::statuses),
                'customer_name' => 'string|min:3|max:255',
                'customer_phone' => 'string|min:10|max:12',
                'destination' => 'string|min:3|max:255',
                'pizzas' => 'nullable',
            ]
        );
        if($validated['status'] == 'ACCEPTED'){
            $order->accepted_by = Auth::id();
            $order->accepted_at = date("Y-m-d H:i:s");
        } else if($validated['status'] == 'COOKED'){
            $order->accepted_by = Auth::id();
            $order->accepted_at = date("Y-m-d H:i:s");
            $order->cooked_by = Auth::id();
            $order->cooked_at = date("Y-m-d H:i:s");
        } else if($validated['status'] == 'DELIVERED'){
            $order->accepted_by = Auth::id();
            $order->accepted_at = date("Y-m-d H:i:s");
            $order->cooked_by = Auth::id();
            $order->cooked_at = date("Y-m-d H:i:s");
            $order->delivered_by = Auth::id();
            $order->delivered_at = date("Y-m-d H:i:s");
        }

        $order->update($validated);
        $order->pizzas()->detach($order->pizzas());
        foreach ($validated["pizzas"] as &$pizza) {
            $order->pizzas()->attach($pizza['id'], ['count' => $pizza['piece']]);
        }
        return Response::noContent(200);
    }

    public function accept(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            throw new NotFoundHttpException();
        }
        $order["status"] = 'ACCEPTED';
        $order->accepted_by = Auth::id();
        $order->accepted_at = date("Y-m-d H:i:s");
        $order->save();
        return Response::noContent(200);
    }

    public function cook(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            throw new NotFoundHttpException();
        }
        $order["status"]  = 'COOKED';
        $order->cooked_by = Auth::id();
        $order->cooked_at = date("Y-m-d H:i:s");
        $order->save();
        return Response::noContent(200);
    }


    public function deliver(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            throw new NotFoundHttpException();
        }
        $order["status"]  = 'DELIVERED';
        $order->delivered_by = Auth::id();
        $order->delivered_at = date("Y-m-d H:i:s");
        $order->save();
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
        /** @var Order $order */
        $order = Order::find($id);
        if (!$order) {
            throw new NotFoundHttpException();
        }
        $order->pizzas()->detach($order->pizzas);
        $order->delete();

        return Response::noContent(200);
    }
}
