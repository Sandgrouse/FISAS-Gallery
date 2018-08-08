foreach ($files as $file) {
      # code...
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
      $destinationPath = public_path().'/images/projects';

      #Get the file extension
      $extension = $file->getClientOriginalExtension();

      #Get the name of the file
      $original_name = $file->getClientOriginalName();

      #Filename as stored in the database
      $filename = $random_name.$original_name.$extension;

      // $uploadSuccess = Input::file('image')->move($destinationPath, $filename);
      $uploadSuccess = $file->move($destinationPath, $filename);
      $upload_count++;

      if ($project_id) {
        # code...
        $image = Image::create(array(
          'description' => $file->description,
          'image' => $filename,
          'project_id'=> $project_id
        ));
      } else {
        $image = Image::create(array(
          'description' => $file->description,
          'image' => $filename,
          'project_id'=> $file->project_id
        ));
      }

      return new ImageResource($image);
    }