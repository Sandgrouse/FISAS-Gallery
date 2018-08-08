<?php

use Illuminate\Database\Seeder;
use App\Image;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Image::create(array(
            'project_id' => 4,
            'description' => 'When we dug',
            'image' => 'Sepik.jpg'
        ));
        Image::create(array(
            'project_id' => 4,
            'description' => 'When we scraped',
            'image' => 'yellow_container.jpg'
        ));
        Image::create(array(
            'project_id' => 5,
            'description' => 'When we bored',
            'image' => 'mel.jpg'
        ));
        Image::create(array(
            'project_id' => 5,
            'description' => 'When we bored',
            'image' => 'wood_container.jpg'
        ));
        Image::create(array(
            'project_id' => 3,
            'description' => 'When we bored',
            'image' => 'fabian-grohs.jpg'
        ));
        Image::create(array(
            'project_id' => 3,
            'description' => 'When we bored',
            'image' => 'green_container.jpg'
        ));
        Image::create(array(
            'project_id' => 2,
            'description' => 'When we bored',
            'image' => 'eiliv-aceron.jpg'
        ));
        Image::create(array(
            'project_id' => 2,
            'description' => 'When we bored',
            'image' => 'bread_ui.jpg'
        ));
        Image::create(array(
            'project_id' => 1,
            'description' => 'When we bored',
            'image' => 'blue_container.jpg'
        ));
        Image::create(array(
            'project_id' => 1,
            'description' => 'When we bored',
            'image' => 'ash_container.jpg'
        ));
        Image::create(array(
            'project_id' => 1,
            'description' => 'When we bored',
            'image' => 'orange_container.jpg'
        ));
        Image::create(array(
            'project_id' => 2,
            'description' => 'When we bored',
            'image' => 'outdoor_home.jpg'
        ));
        Image::create(array(
            'project_id' => 3,
            'description' => 'When we bored',
            'image' => 'red_container.jpg'
        ));
        Image::create(array(
            'project_id' => 4,
            'description' => 'When we bored',
            'image' => 'hipster-mum.jpg'
        ));
        Image::create(array(
            'project_id' => 5,
            'description' => 'When we bored',
            'image' => 'navy_blue_continer.jpg'
        ));
        Image::create(array(
            'project_id' => 4,
            'description' => 'When we bored',
            'image' => 'jeff-sheldon.jpg'
        ));
    }
        
}
