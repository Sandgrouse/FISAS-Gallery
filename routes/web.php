<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/auth', function(){
  //Perform a check to see whether the user is authenticated or SyncEvent
  // Remove the if block during production

  if (!Auth::check()) {
    # code...
    $user = App\User::find(1);
    Auth::login($user);
  }

  return Auth::user();
});


Route::get('/home', 'HomeController@index')->name('home');

Route::redirect('/map', '/app', 301);
Route::redirect('/add-a-project', '/app', 301);