<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Image;
use App\Http\Resources\ImageResource;
use Validator;

class ImageController extends Controller
{
    //
    public function __construct()
    {
        // $this->middleware('auth:api');

    }

  public function getForm($id) {
    $project = Project::find($id);
  }

  public function addImages(Request $request, $projectId){
    
    $rules = array(

      'project_id' => 'required|numeric|exists:projects,id',
      'images.*'=>'required|image|mimes:jpeg,png,jpg,gif,svg'

    );


    // $files = $request->file('images[]');
    $images = $request->images;
    // var_dump($files);
    $file_count = count($images);
    $count = 0;

    function move ($file, $upload_count, $project_id){
      // $validator = Validator::make(Request::all(), $rules);
      /* $validator = Validator::make(array('file' => $file ), $rules);
      if($validator->fails()){

        /* return Redirect::route('add_image',array('id' =>Input::get('project_id')))
        ->withErrors($validator)
        ->withInput(); 

        return response()->json(['error' => 'Your image failed to validate'], 400);
      } */
      # Generate some random strings
      $random_name = str_random(8);

      #Get location of folder to save files in
      // $destinationPath = 'public/images/'. $file->project_id .'/';
      $destinationPath = public_path().'/images/projects/'. $project_id .'/';

      #Get the file extension
      $extension = $file->getClientOriginalExtension();

      #Get the name of the file
      $original_name = $file->getClientOriginalName();

      #Filename as stored in the database
      $filename = $random_name.'_' .$original_name;

      // $uploadSuccess = Input::file('image')->move($destinationPath, $filename);
      $uploadSuccess = $file->move($destinationPath, $filename);
      $upload_count++;

      if ($project_id) {
        # code...
        $image = Image::create(array(
          'description' => '',
          'image' => $filename,
          'project_id'=> $project_id
        ));
      } else {
        $image = Image::create(array(
          'description' => '',
          'image' => $filename,
          'project_id'=> $file->project_id
        ));
      }

      return new ImageResource($image);
    }

    foreach ($images as $a_file) {
      # code...
      move($a_file, $count, $projectId);
    }

    // move($files, $count, $projectId);

    /* if (is_array($images)) {
      # code...
      foreach ($images as $a_file) {
        # code...
        move($a_file, $count, $projectId);
      }
    } else {
      # code...
      move($files, $count, $projectId);
    } */
    

    // move($files, $count, $projectId);


    return response()->json(['Sucess' => 'You have added images to your project.'], 201);
    
    // return Redirect::route('show_project',array('id'=>Input::get('project_id')));
  }

  public function storeImages(Request $request){
    $rules = array(

      'project_id' => 'required|numeric|exists:projects,id',
      'images.*'=>'required|image|mimes:jpeg,png,jpg,gif,svg'

    );


    /* $validator = Validator::make($request->all(), $rules);
    if($validator->fails()){

      return response()->json(['error' => 'Your image failed to validate'], 400);
    } */
    

    // $files = Request::file('images');
    $files = $request->images;
    $file_count = count($files);
    $count = 0;
    $projectId = $request->project_id;

    {
      $this->middleware('auth:api')->except(['index', 'show']);
    }

    function move ($file, $upload_count, $project_id){
      // $validator = Validator::make(Request::all(), $rules);
      /* $validator = Validator::make(array('file' => $file ), $rules);
      if($validator->fails()){

        /* return Redirect::route('add_image',array('id' =>Input::get('project_id')))
        ->withErrors($validator)
        ->withInput(); 

        return response()->json(['error' => 'Your image failed to validate'], 400);
      } */
      # Generate some random strings
      $random_name = str_random(8);

      #Get location of folder to save files in
      // $destinationPath = 'public/images/'. $file->project_id .'/';
      $destinationPath = public_path().'/storage/images/projects/'. $project_id .'/';

      #Get the file extension
      $extension = $file->getClientOriginalExtension();

      #Get the name of the file
      $original_name = $file->getClientOriginalName();

      #Filename as stored in the database
      $filename = $random_name.'_' .$original_name;

      // $uploadSuccess = Input::file('image')->move($destinationPath, $filename);
      $uploadSuccess = $file->move($destinationPath, $filename);
      $upload_count++;

      if ($project_id) {
        # code...
        $image = Image::create(array(
          'description' => '',
          'image' => $filename,
          'project_id'=> $project_id
        ));
      } else {
        $image = Image::create(array(
          'description' => '',
          'image' => $filename,
          'project_id'=> $file->project_id
        ));
      }

      return new ImageResource($image);
    }

    foreach ($files as $image) {
      # code...
      move($image, $count, $projectId);
      
    }

    // return response()->json(['error' => 'You can only edit your own images.'], 500);
    // return new ImageResource($image);
    return response()->json(['Sucess' => 'You have added new images to your project.'], 201);
    

    // return Redirect::route('show_project',array('id'=>Input::get('project_id')));
  }

  public function testImages (Request $request) {
    LaravelChromeLogger::log($request);
    return response()->json(['Sucess' => 'You have added images to your project.'], 201);
  }


  public function getDelete($id)
  {
    $image = Image::find($id);
    $image->delete();
    return Redirect::route('show_project',array('id'=>$image->project_id));
  }

  public function postMove()
    {
    $rules = array(

        'new_project' => 'required|numeric|exists:projects,id',
        'photo'=>'required|numeric|exists:images,id'

    );

    $validator = Validator::make(Input::all(), $rules);
    if($validator->fails()){

        return Redirect::route('index');
    }
    $image = Image::find(Input::get('photo'));
    $image->project_id = Input::get('new_project');
    $image->save();
    return Redirect::route('show_project',array('id'=>Input::get('new_project')));
  }
}
