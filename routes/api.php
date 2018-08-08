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

// Route::get('/create-project', array('as' => 'create_project_form','uses' => 'ProjectsController@getForm'));

// Route::post('/create-project', array('as' => 'create_project','uses' => 'ProjectsController@postCreate'));

// Route::get('/delete-project/{id}', array('as' => 'delete_project','uses' => 'ProjectsController@getDelete'));

// Route::get('/project/{id}', array('as' => 'show_project','uses' => 'ProjectsController@getProject'));




// Route::post('/addimage', array('as' => 'add_image_to_project','uses' => 'ImagesController@postAdd'));

// Route::get('/deleteimage/{id}', array('as' => 'delete_image','uses' => 'ImagesController@getDelete'));

// Route::post('/moveimage', array('as' => 'move_image', 'uses' => 'ImagesController@postMove'));
