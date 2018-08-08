<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'position' => [$this->latitude, $this->longitude],
            'photos' => $this->photos,
            'iw_id' => str_random(8)
        ];
    }
}
