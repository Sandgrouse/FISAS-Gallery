export interface ProjectImage {
    id: number;
    project_id: number;
    image: string;
    description: string;
    created_at?: string;
    updated_at?: string;
    cols?: number;
    rows?: number;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    created_at?: string;
    updated_at?: string;
    start_date: string;
    end_date: string;
    photos: ProjectImage[];
    iw_id: string;
}
