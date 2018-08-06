import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GalleryService } from '../_services/gallery.service';
import { HttpEventType } from '@angular/common/http';

interface ImageDialogData {
    project_id: string;
}

@Component({
    selector: 'app-upload-images',
    templateUrl: './add-images.component.html',
    styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {

    primaryButtonText: string;
    canBeClosed: boolean;
    serverResponse: any;
    uploadSuccessful: boolean;
    uploadProgress: number;
    uploading: boolean;
    fileUploadSub: any;
    fileList: FileList;
    file_count: number;
    filesLoaded = false;
    project_id: string;
    secondButtonText = 'Cancel';
    secondButtonColor = 'warn';

    constructor(public dialogRef: MatDialogRef<AddImagesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ImageDialogData,
        private router: Router, private galleryService: GalleryService,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef) { }


    addImagesForm = this.fb.group({
        imageFile: [null, Validators.required]
    });

    ngOnInit(): void {
        this.project_id = this.data.project_id;
        console.log(this.data);

    }

    onFilesAdded(fileList: FileList) {
        this.filesLoaded = true;
        const fileItem = fileList.item(0);
        console.log(fileList);
        this.fileList = fileList;
        this.file_count = fileList.length;
        this.addImagesForm.get('imageFile').setValue(this.fileList);
    }

    private prepareData () {

        const input = new FormData();
        input.append('project_id', this.project_id);

        for (let index = 0; index < this.fileList.length; index++) {
          const element = this.fileList[index];
          input.append('images[]', element);
        }

        return input;
    }

    private handleProgress(event) {
        // create a new progress-subject for every file
        this.uploading = true;
        if (event.type === HttpEventType.DownloadProgress) {
          this.uploading = true;
        }

        if (event.type === HttpEventType.UploadProgress) {
          this.uploading = true;
          this.uploadProgress  = Math.round(100 * event.loaded / event.total);
          console.log('Saving');
        }

        if (event.type === HttpEventType.Response) {
          // console.log(event.body);
          this.uploadSuccessful = true;
          this.serverResponse = event.body;
          this.canBeClosed = true;
          this.uploading = false;
          // The OK-button should have the text "Finish" now
          this.secondButtonText = 'Finish';
          this.secondButtonColor = 'primary';
          console.log('upload complete');
        }

    }

    onSubmit() {
        const formModel = this.prepareData();
        this.fileUploadSub = this.galleryService.addImages(formModel).subscribe(
            event => {
              this.handleProgress(event);
              console.log(event);
            },
            error => {
                console.log('Server error');
        });
    }

    clickButton() {
        const button = document.getElementById('submit-button');
        button.click();
    }

    closeModal() {
        this.dialogRef.close();
        this.addImagesForm.reset();
    }

}
