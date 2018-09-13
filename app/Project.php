<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Image;

class Project extends Model
{
    //
    protected $table = 'projects';

    protected $fillable = array('name','description','category', 'latitude', 'longitude', 'start_date', 'end_date');

    public function photos(){

        return $this->hasMany(Image::class);
    }
}
