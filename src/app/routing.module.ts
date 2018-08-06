import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProjectFoldersComponent } from './project-folders/project-folders.component';
import { AddProjectComponent } from './addProject/addProject.component';
import { AuthGuard } from './_guards';

const routes: Routes = [

  { path: 'map', component: MapComponent},
  {
    path: 'gallery/:id',
    component: GalleryComponent,
  },
  {
    path: 'projects',
    component: ProjectFoldersComponent,
  },
  {
    path: 'add-a-project',
    component: AddProjectComponent, canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: '**', redirectTo: 'map' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
