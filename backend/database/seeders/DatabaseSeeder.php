<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Pizza;
use App\Models\Order;
use App\Models\User;
use App\Models\Ingredient;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
		$this->destroyOldTables();

        for($i = 1; $i<10; $i++) {
            (new User([
                'name' => 'User'.$i,
                'email' => 'user' . $i . '@fullstack.hu',
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
                'is_courier' => $i > 4
            ]))->save();
        }

        Pizza::factory(10)->create();
        Order::factory(10)->create();
        Ingredient::factory(10)->create();

        $pizzas = Pizza::all();
        $pizzas_count = $pizzas->count();

        $users = User::all();

        $ingredients = Ingredient::all();
        $ingredients_count = $ingredients->count();

        $orders = Order::all();

        $orders->each(
            function ($order)
            use (&$pizzas, &$pizzas_count, &$users)
            {
                $pizza_ids = $pizzas->random(rand(1, $pizzas_count))->pluck('id')->toArray();

                $order->pizzas()->attach($pizza_ids);

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

                $order->save();
            }
        );

        Pizza::all()->each(function ($pizza) use (&$ingredients, &$ingredients_count){
            $ingredient_ids = $ingredients->random(rand(1,$ingredients_count))->pluck('id')->toArray();
            $pizza->ingredients()->attach($ingredient_ids);
            $pizza->save();
        });
    }

    private function destroyOldTables() {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('users')->truncate();
        DB::table('order_pizza')->truncate();
        DB::table('orders')->truncate();
        DB::table('pizzas')->truncate();
        DB::table('ingredients')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
