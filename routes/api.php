<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| User authentication routes
|--------------------------------------------------------------------------
| Login and register users 
|
*/

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
Route::get('logout', 'AuthController@logout');
Route::post('addimage', array('as' => 'add_image','uses' => 'ImageController@storeImages'));

Route::apiResource('projects', 'ProjectsController');
// Route::apiResource('/project/{project}', 'ProjectsController');

