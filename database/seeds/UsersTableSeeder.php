<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        User::create(array(
            'name' => 'Geoffrey',
            'email' => 'jeffo@fisas.com',
            'password' => bcrypt('Please')
        ));

        User::create(array(
            'name' => 'Admin',
            'email' => 'admin@fisas.com',
            'password' => bcrypt('#opensesame#')
        ));
    }
}
