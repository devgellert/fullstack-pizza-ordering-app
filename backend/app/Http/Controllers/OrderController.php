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
        ]);

        $validated['status'] = 'ORDERED';

        Order::create($validated);
        return Response::noContent(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Order::find($id);
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
            ]
        );
        if($validated['status'] == 'ACCEPTED'){
            $order->accepted_by = Auth::id();
            $order->accepted_at = date("Y-m-d H:i:s");
        } else if($validated['status'] == 'COOKED'){
            $order->cooked_by = Auth::id();
            $order->cooked_at = date("Y-m-d H:i:s");
        } else if($validated['status'] == 'DELIVERED'){
            $order->delivered_by = Auth::id();
            $order->delivered_at = date("Y-m-d H:i:s");
        }

        $order->update($validated);
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
        $order->delete();

        return Response::noContent(200);
    }
}
