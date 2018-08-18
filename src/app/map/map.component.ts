import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { GalleryService } from '../_services';
import { Project } from '../_models';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Marker } from '@ngui/map';
import { identity } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddImagesComponent } from '../add-images/add-images.component';
import { ProjectImage } from '../_models/project';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { DeleteSuccessComponent } from '../confirm-delete/DeleteSuccess/DeleteSuccess.component';

interface FisasMarker {
  display: boolean;
    lat: number;
    lng: number;
    description: string;
    id: number;
    images: string[];
}


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  isAuthenticated: boolean;
  public positions: any[];
  images: Array<string>;
  public projects: Project[];
  headers;

  marker: FisasMarker = {
    display: false,
    lat: null,
    lng: null,
    description: null,
    id: null,
    images: null
  };

  constructor(private _http: HttpClient, private _galleryService: GalleryService,
    private router: Router, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.positions = this.getRandomMarkers();
  }

  ngOnInit() {
    this.checkAuth();
    /* this._http.get('https://picsum.photos/list')
        .pipe(map((images: Array<{id: number}>) => this._randomImageUrls(images)))
        .subscribe(images => this.images = images); */
    this.getallProjects();
  }

  private _randomImageUrls(images: Array<{id: number}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
  }
  private _ImageUrls(images: ProjectImage[]): Array<string> {
    return [1, 2, 3].map(() => {
      const imageObj = images[Math.floor(Math.random() * images.length)];
      const image = imageObj.image;
      const project_id = imageObj.project_id;
      // return `https://picsum.photos/900/500?image=${randomId}`;
      return `./images/projects/${project_id}/${image}`;
    });
  }

  private checkAuth () {
    const current_user = JSON.parse(localStorage.getItem('currentUser'));

    if (current_user) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  getallProjects () {
     this._galleryService.getProjects().subscribe(
       (data) => {
         this.projects = data.data;
         console.log(this.projects);
        }
      );

  }

  getRandomMarkers() {
    let randomLat: number, randomLng: number;

    const positions = [];
    for (let i = 0 ; i < 10; i++) {
      randomLat = Math.random() * (43.7399 - 43.7300) + 43.7300;
      randomLng = Math.random() * (-79.7600 - -79.7699) + -79.7699;
      positions.push([randomLat, randomLng]);
    }

    return positions;
  }

  clicked({target: marker}, description, id, imageArray) {
    this.checkAuth();
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    this.marker.description = description;
    this.marker.id = id;
    this.marker.images = this.images = this._ImageUrls(imageArray);

    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  onMarkerInit(marker) {
    // console.log('marker', marker);
  }

  hideMarkerInfo(id) {
    // this.marker.display = !this.marker.display;
    console.log(id);
    this.router.navigate(['gallery', id]);
  }

  deleteProject(id: number | string) {
  }

  openDeleteDialog(id: number | string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '50%',
      // height: '50%',
      disableClose: true,
      data: {
        project_id: this.marker.id.toString()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The project was deleted or cancelled', result);
      // this.animal = result;
      // this.backToMap();
      if (result === true) {
        this.openSnackBar();
        this.getallProjects();
      }
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddImagesComponent, {
      width: '50%',
      // height: '50%',
      disableClose: true,
      data: {
        project_id: this.marker.id.toString()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The image upload dialog was closed', result);
      // this.animal = result;
      // this.backToMap();
    });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(DeleteSuccessComponent, {
      duration: 2000,
    });
  }

}
