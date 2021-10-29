<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Pizza;
use App\Models\Order;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
		DB::statement('SET FOREIGN_KEY_CHECKS=0;');


        DB::table('users')->truncate();
        DB::table('order_pizza')->truncate();
        DB::table('orders')->truncate();
        DB::table('pizzas')->truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        \App\Models\User::factory(10)->create();
        \App\Models\Pizza::factory(10)->create();
        \App\Models\Order::factory(10)->create();

        $pizzas = Pizza::all();
        $pizzas_count = $pizzas->count();

        $users = User::all();
        $users_count = $users->count();

        Order::all()->each(function ($order) use (&$pizzas, &$pizzas_count, &$users, &$users_count){
            $pizza_ids = $pizzas->random(rand(1,$pizzas_count))->pluck('id')->toArray();
            $order->pizzas()->attach($pizza_ids);
            if($users_count>0){
                switch ($order->status) {
                    case 'ACCEPTED':
                        $order->acceptedBy()->associate($users->random());
                        break;
                    case 'COOKED':
                        $order->acceptedBy()->associate($users->random());
                        $order->cookedBy()->associate($users->random());
                        break;
                    case 'DELIVERED':
                        $order->acceptedBy()->associate($users->random());
                        $order->cookedBy()->associate($users->random());
                        $order->deliveredBy()->associate($users->random());
                        break;
                    default:
                        break;
                }

            }

            $order->save();
        });
    }
}
