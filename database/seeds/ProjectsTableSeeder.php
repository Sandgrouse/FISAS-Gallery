<?php

use Illuminate\Database\Seeder;
use App\Project;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Project::create(array(
            'name' => 'Enugu field work',
            'description' => 'Look I am a test description Enugu.',
            'category' => 'land_survey',
            'latitude' => 6.533674168505329,
            'longitude' => 3.3749383054573627,
            'start_date' => '2018/07/27',
            'end_date' => '2018/07/27'
        ));

        Project::create(array(
            'name' => 'Abuja survey work',
            'description' => 'Look I am a sample of a project for Abuja.',
            'category' => 'ground_engineering_geophysics',
            'latitude' => 6.531542333184111,
            'longitude' => 3.3812897764046284,
            'start_date' => '2018-07-27',
            'end_date' => '2018-07-27'
        ));

        Project::create(array(
            'name' => 'Digging Anambra',
            'description' => 'Look I am a test description for Anambra.',
            'category' => 'environmental_site_assessments',
            'latitude' => 6.525402596727997,
            'longitude' => 3.3721488080818744,
            'start_date' => '2018-07-27',
            'end_date' => '2018-07-27'
        ));
        Project::create(array(
            'name' => 'Digging Gudeu',
            'description' => 'Look I am a test description for Gudu.',
            'category' => 'geotechnical_soil_investigation',
            'latitude' => 6.529623673630106,
            'longitude' => 3.3751957975227924,
            'start_date' => '2018-07-27',
            'end_date' => '2018-07-27'
        ));
        Project::create(array(
            'name' => 'Digging Asokoro',
            'description' => 'Look I am a test description for Asokoro.',
            'category' => 'land_survey',
            'latitude' => 6.529367851800549,
            'longitude' => 3.385066326697597,
            'start_date' => '2018-07-27',
            'end_date' => '2018-07-27'
        ));
    }
}
