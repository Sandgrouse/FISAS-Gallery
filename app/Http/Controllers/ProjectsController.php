<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use App\Image;
use App\Http\Resources\ProjectResource;
use App\Http\Controllers\ImageController;
use Validator;
use DigitalDrifter\LaravelChromeLogger\LaravelChromeLogger;



class ProjectsController extends Controller
{
    //

    /**
     * The user repository instance.
     */
    protected $image_controller;


    public function __construct(ImageController $imageContoller)
    {
        $this->image_controller = $imageContoller;
        $this->middleware('auth:api')->except(['index', 'show']);

    }

    public function index() {

      $projects = Project::with('photos')->get();

      return ProjectResource::collection($projects);
    }

    public function show (Project $project) {
      // $project = Project::with('photos')->find($id);
      // $project = Project::find($Project);
      // return ProjectResource::collection($project);
      return new ProjectResource($project);

    }
    
    public function store(Request $request) {
      $rules = array(
  
        'name' => 'bail|required',
        'description'=>'required',
        'latitude' => 'required', 
        'longitude' => 'required',
        'images.*' => 'required|file|image|mimes:jpeg,png,gif,webp'
  
      );

      
      $validator = Validator::make($request->all(), $rules);
      if($validator->fails()){
  
        return response()->json(['error' => 'Your project cannot be created because the request failed to validate'], 400);

      }
  
      /* $file = Input::file('cover_image');
      $random_name = str_random(8);
      $destinationPath = 'projects/';
      $extension = $file->getClientOriginalExtension();
      $filename=$random_name.'_cover.'.$extension;
      $uploadSuccess = Input::file('cover_image')
      ->move($destinationPath, $filename); */
      
      $project = Project::create(array(
        'name' => $request->name,
        'description' => $request->description,
        'latitude' => $request->latitude,
        'longitude' => $request->longitude,
        'start_date' => $request->start_date,
        'end_date' => $request->end_date,
        'cover_image' => '',
      ));

      $path = public_path().'/images/projects';
      $random_name = str_random(8);
      $file_name = $random_name . '_new-image';

      /* $photo = $request->file('images');
            $photo->move($path, $photo->getClientOriginalName());
            // var_dump($photo);
            $reply = $photo; */

     /*  try {
        if($request->hasFile('images')){
            
            $reply = $this->image_controller->addImages($request, $project->id);
        }else {
            $reply = 'File Not Found';
        }
      }catch (Exception $e){
          $reply = $e;
      } */
      $this->image_controller->addImages($request, $project->id);
      // $this->addImages($request, $project->id);

      // return $reply;

      return new ProjectResource($project);
  
      // return Redirect::route('show_project',array('id'=>$project->id));

    }

    public function update(Request $request, Project $project)
    {
      // check if currently authenticated user is the owner of the book
      /* if ($request->user()->id !== $book->user_id) {
        return response()->json(['error' => 'You can only edit your own books.'], 403);
      } */

      $project->update($request->only(['name', 'description', 'start_date', 'end_date']));

      return new ProjectResource($project);
    }

  
    public function destroy(Project $id) {
      $project = Project::find($id);
      LaravelChromeLogger::log($project);
  
      $project->delete();
      return response()->json(null, 204);
  
      // return Redirect::route('index');
    }
}
