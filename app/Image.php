<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Project;

class Image extends Model
{
    //
    protected $table = 'images';
  
    protected $fillable = array('project_id','description','image');

    public function project()
    {
      return $this->belongsTo(Project::class);
    }
}
