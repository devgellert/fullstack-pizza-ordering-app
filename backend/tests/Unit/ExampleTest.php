<?php

namespace Tests\Unit;

use App\Models\Pizza;
use App\Models\Ingredient;
use App\Models\Order;
use App\Models\User;
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_ingredient_create()
    {
        $ingredient = new Ingredient(['name'=>'ananas']);
        $this->assertTrue($ingredient->name == 'ananas');
    }

    public function test_pizza_create()
    {
        $pizza = new Pizza(['name'=>'Hawaii', 'size' => 25, 'price' => 2212]);
        $this->assertTrue($pizza->name == 'Hawaii');
        $this->assertTrue($pizza->size == 25);
        $this->assertTrue($pizza->price == 2212);
    }

    public function test_user_create()
    {
        $user = new User(
            ['name' => 'Béla',
            'email' => 'user@fullstack.hu',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => '0123456789',
            'is_courier' => false]);
        $this->assertTrue($user->name == 'Béla');
        $this->assertTrue($user->email == 'user@fullstack.hu');
    }
}
