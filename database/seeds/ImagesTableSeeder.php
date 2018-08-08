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
            'image' => 'public/images/projects/4/Sepik.jpg'
        ));
        Image::create(array(
            'project_id' => 4,
            'description' => 'When we scraped',
            'image' => 'public/images/projects/4/yellow_container.jpg'
        ));
        Image::create(array(
            'project_id' => 5,
            'description' => 'When we bored',
            'image' => 'public/images/projects/5/mel.jpg'
        ));
        Image::create(array(
            'project_id' => 5,
            'description' => 'When we bored',
            'image' => 'public/images/projects/5/wood_container.jpg'
        ));
        Image::create(array(
            'project_id' => 3,
            'description' => 'When we bored',
            'image' => 'public/images/projects/3/fabian-grohs.jpg'
        ));
        Image::create(array(
            'project_id' => 3,
            'description' => 'When we bored',
            'image' => 'public/images/projects/3/green_container.jpg'
        ));
        Image::create(array(
            'project_id' => 2,
            'description' => 'When we bored',
            'image' => 'public/images/projects/2/eiliv-aceron.jpg'
        ));
        Image::create(array(
            'project_id' => 2,
            'description' => 'When we bored',
            'image' => 'public/images/projects/2/bread_ui.jpg'
        ));
        Image::create(array(
            'project_id' => 1,
            'description' => 'When we bored',
            'image' => 'public/images/projects/1/blue_container.jpg'
        ));
        Image::create(array(
            'project_id' => 1,
            'description' => 'When we bored',
            'image' => 'public/images/projects/1/ash_container.jpg'
        ));
        Image::create(array(
            'project_id' => 1,
            'description' => 'When we bored',
            'image' => 'public/images/projects/1/orange_container.jpg'
        ));
        Image::create(array(
            'project_id' => 2,
            'description' => 'When we bored',
            'image' => 'public/images/projects/2/outdoor_home.jpg'
        ));
        Image::create(array(
            'project_id' => 3,
            'description' => 'When we bored',
            'image' => 'public/images/projects/3/red_container.jpg'
        ));
        Image::create(array(
            'project_id' => 4,
            'description' => 'When we bored',
            'image' => 'public/images/projects/4/hipster-mum.jpg'
        ));
        Image::create(array(
            'project_id' => 5,
            'description' => 'When we bored',
            'image' => 'public/images/projects/5/navy_blue_continer.jpg'
        ));
        Image::create(array(
            'project_id' => 4,
            'description' => 'When we bored',
            'image' => 'public/images/projects/4/jeff-sheldon.jpg'
        ));
    }
        
}
