import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { GalleryService } from '../_services';
import { HttpEventType, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Subject, Observable, forkJoin, Subscription } from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
// import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as moment from 'moment';

export interface DialogData {
  animal: string;
  name: string;
  status: any;
  newProjectForm: FormGroup;
  fileList: FileList;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './addProject.component.html',
  styleUrls: ['./addProject.component.css']
})
export class AddProjectComponent implements OnInit {

  event: HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<{}> | HttpUserEvent<{}>;
  // Used in template
  file_count: number;
  animal: string;
  user_name = 'Jeffo';
  marker_position = [0, 0];
  map_center = 'Lagos, Nigeria';
  status = {project_status: null};

  // State properties
  filesLoaded = false;

  // Marker reference object
  marker = {
    lat: null,
    lng: null,
  };

  @ViewChild('markerRef') markerTag;
  @ViewChild('imageFile') images;
  // public files: Set<File> = new Set();
  public files: File[] = new Array();
  fileUploadSub: any;
  serverResponse: any;
  public fileList: FileList;

  newProjectForm = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    imageFile: [null, Validators.required]
  });

  constructor(public dialog: MatDialog,
      private router: Router,
      private fb: FormBuilder,
      private cd: ChangeDetectorRef,
  ) {
    // this.animal = 'Lion';
    // this.name = 'Jeffo';
  }


  ngOnInit() {
  }

  private getMarkerPosition(e) {
    // this.marker.lat = e.latLng.lat();
    // this.marker.lng = e.latLng.lng();
    this.newProjectForm.patchValue({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng()
    });
  }


  sampleData() {

    const start = this.newProjectForm.get('start_date').value;
    const end = this.newProjectForm.get('end_date').value;
    const start_date = moment(start).format('YYYY-MM-DD');
    const end_date = moment(end).format('YYYY-MM-DD');
    console.log('Start: ', start_date, 'End: ', end_date);


    const payload = new FormData();
    payload.append('name', this.newProjectForm.get('name').value);
    payload.append('description', this.newProjectForm.get('description').value);
    payload.append('latitude', this.newProjectForm.get('latitude').value);
    payload.append('longitude', this.newProjectForm.get('longitude').value);
    payload.append('start_date', start_date);
    payload.append('end_date', end_date);
    payload.append('images', '');

    return payload;
  }

  /* private handleProgress(event) {
    // create a new progress-subject for every file
    const progress = new Subject<number>();
    this.uploading = true;

    if (event.type === HttpEventType.DownloadProgress) {
      this.uploading = true;
      this.uploadProgress  = Math.round(100 * event.loaded / event.total);
      progress.next(this.uploadProgress);
    }

    if (event.type === HttpEventType.UploadProgress) {
      this.uploading = true;
      this.uploadProgress  = Math.round(100 * event.loaded / event.total);
      progress.next(this.uploadProgress);
      console.log('Uploading');
    }

    if (event.type === HttpEventType.Response) {
      // console.log(event.body);
      this.uploadSuccessful = true;
      this.serverResponse = event.body;
      progress.complete();
      console.log('upload complete');
    }

    // Save every progress-observable in a map of all observables
    return this.status.project_status = {
      progress: progress.asObservable()
    };
  } */

  addFiles() {
  }

  onFilesAdded(fileList: FileList) {

    this.filesLoaded = true;
    const fileItem = fileList.item(0);
    this.fileList = fileList;
    this.file_count = fileList.length;


    this.newProjectForm.get('imageFile').setValue(this.fileList);

    console.log(this.fileList, fileItem);
  }

  backToMap() {
    this.router.navigate(['map']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadImageDialogComponent, {
      width: '50%',
      /// height: '50%',
      disableClose: true,
      data: {
        name: this.user_name,
        status: this.status,
        newProjectForm: this.newProjectForm,
        fileList: this.fileList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.animal = result;
      this.backToMap();
    });
  }

  onMapClick(event) {
    if (event instanceof MouseEvent) {return; }
    this.marker_position = event.latLng;
    event.target.panTo(event.latLng);
    this.getMarkerPosition(event);
  }

  dragged(event: DragEvent) {
    this.getMarkerPosition(event);
    console.log('stopped dragging');
  }

  getErrorMessage() {
    return this.newProjectForm.controls.name.hasError('required') ? 'You must provide some information' :
        this.newProjectForm.controls.description.hasError('required') ? 'A short description is required' :
            '';
  }

}

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: 'upload-image-dialog.html',
  styleUrls: ['./addProject.component.css']
})

export class UploadImageDialogComponent implements OnInit {

    serverResponse: any;
    fileUploadSub: Subscription;
    progress: any;
    // State properties
    uploadProgress ;
    canBeClosed = false;
    showCancelButton = true;
    uploading = false;
    uploadSuccessful = false;
    primaryButtonText = 'Saving';

  constructor(
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private galleryService: GalleryService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
            'thumbs-up',
            sanitizer.bypassSecurityTrustResourceUrl('assets/images/like.svg'));
    }

  ngOnInit (): void {
    // console.log(this.uploadComplete);
    this.onSubmitData();
    // this.checkProgress();
  }

  checkProgress() {
    // start the upload and save the progress map
    this.progress = this.data.status;

    // convert the progress map into an array
    const allProgressObservables = [];

    allProgressObservables.push(this.progress.project_status.progress);

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });

    /* setTimeout(() => {
      // FormData cannot be inspected (see "Key difference"), hence no need to log it here
      alert('done!');
      this.loading = false;
    }, 1000); */
  }

  onNoClick(): void {
      this.dialogRef.close();
      this.data.newProjectForm.reset();

    /* if (this.data.uploadSuccessful) {
      this.dialogRef.close();
    } */

  }

  private handleProgress(event) {
    // create a new progress-subject for every file
    const progress = new Subject<number>();
    this.uploading = true;

    if (event.type === HttpEventType.DownloadProgress) {
      this.uploading = true;
      this.uploadProgress  = Math.round(100 * event.loaded / event.total);
      progress.next(this.uploadProgress);
    }

    if (event.type === HttpEventType.UploadProgress) {
      this.uploading = true;
      this.uploadProgress  = Math.round(100 * event.loaded / event.total);
      progress.next(this.uploadProgress);
      console.log('Saving');
    }

    if (event.type === HttpEventType.Response) {
      // console.log(event.body);
      this.uploadSuccessful = true;
      this.serverResponse = event.body;
      this.canBeClosed = true;
      // The OK-button should have the text "Finish" now
        this.primaryButtonText = 'Finish';
      progress.complete();
      console.log('upload complete');
    }

    // Save every progress-observable in a map of all observables
    return this.data.status.project_status = {
      progress: progress.asObservable()
    };
  }

  private prepareSave(): FormData {
    // Format dates for server
    const start = this.data.newProjectForm.get('start_date').value;
    const end = this.data.newProjectForm.get('end_date').value;
    const start_date = moment(start).format('YYYY-MM-DD');
    const end_date = moment(end).format('YYYY-MM-DD');


    const input = new FormData();
    input.append('name', this.data.newProjectForm.get('name').value);
    input.append('description', this.data.newProjectForm.get('description').value);
    input.append('latitude', this.data.newProjectForm.get('latitude').value);
    input.append('longitude', this.data.newProjectForm.get('longitude').value);
    input.append('start_date', start_date);
    input.append('end_date', end_date);

    for (let index = 0; index < this.data.fileList.length; index++) {
      const element = this.data.fileList[index];
      input.append('images[]', element);
    }

    // input.append('images', this.newProjectForm.get('imageFile').value);


    return input;
  }

  onSubmitData() {
    // event.preventDefault();
    const formModel = this.prepareSave();
    // console.log(this.newProjectForm.get('start_date').value);

    this.fileUploadSub = this.galleryService.createProject(formModel).subscribe(
      event => {
        this.handleProgress(event);
        console.log(event);
      },
      error => {
          console.log('Server error');
      });

    // const submittedData = projectForm.value;
    // console.log(submittedData, this.newProjectForm.get('description').value, this.newProjectForm.get('imageFile').value);
  }

}
