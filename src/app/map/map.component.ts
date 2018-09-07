import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { GalleryService } from '../_services';
import { Project } from '../_models';
import { google } from 'google-maps';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Marker } from '@ngui/map';
import { identity } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddImagesComponent } from '../add-images/add-images.component';
import { ProjectImage } from '../_models/project';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { DeleteSuccessComponent } from '../confirm-delete/DeleteSuccess/DeleteSuccess.component';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

export interface FisasMarker {
  display: boolean;
    lat: number;
    lng: number;
    description: string;
    id: number;
    images: string[];
    name: string;
}

declare function InfoBubble ({}?): void;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, AfterContentInit {

  user: User;
  isAuthenticated: boolean;
  public positions: any[];
  images: Array<string>;
  public projects: Project[];
  headers;
  message: boolean;
  map_center = 'Lagos, Nigeria';

  marker: FisasMarker = {
    id: null,
    name: null,
    description: null,
    display: false,
    lat: null,
    lng: null,
    images: null
  };

  infoBubble: google.maps.infobubble.InfoBubble;

  constructor(private _http: HttpClient, private _galleryService: GalleryService, private userService: UserService,
    private router: Router, public dialog: MatDialog, public snackBar: MatSnackBar) {

  }

  ngOnInit() {

    this.checkAuth();
    this.getallProjects();
    this.infoBubble = new InfoBubble({
      maxWidth: 390,
      padding: 0,
      disableAutoPan: false
    });
    console.log(this.infoBubble);

  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  goToUploadForm () {
    this.router.navigate(['add-a-project']);
  }

  onMapReady(theMap) {
    console.log('map: ', theMap);
  }

  private _randomImageUrls(images: Array<{id: number}>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
  }
  private _ImageUrls(images: ProjectImage[]): Array<string> {

    function getUrls(imageObject) {
      const image = imageObject.image;
      const project_id = imageObject.project_id;
      return `./images/projects/${project_id}/${image}`;
    }

    const sliced_images = images.slice(0, 3);
    return sliced_images.map(getUrls);
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
        }
      );

  }


  clicked({target: marker}, description, id, imageArray, name) {
    this.checkAuth();
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    this.marker.description = description;
    this.marker.id = id;
    this.marker.name = name;
    this.marker.images = this.images = this._ImageUrls(imageArray);


    const bubble = document.getElementById('bubble-content');
    console.log(bubble);


    this.infoBubble.setContent(bubble);

     // marker.nguiMapComponent.openInfoWindow('iw', marker);
    // this.infoWindow.open(marker.map, marker);
    if (!this.infoBubble.isOpen()) {
       this.infoBubble.open(marker.map, marker);
    } else {
      this.infoBubble.close();
      this.infoBubble.open(marker.map, marker);

    }

    // this.infoBubble.open(marker);

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
      width: '25%',
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
      width: '25%',
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
