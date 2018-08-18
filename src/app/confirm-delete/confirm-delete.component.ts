import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GalleryService } from '../_services/gallery.service';

interface ProjectData {
  project_id: number;
}

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  deleted = false;
  deleting = false;
  deleteFailed = false;

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectData,
    private galleryService: GalleryService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  confirmDelete() {
    this.deleting = true;
    this.galleryService.deleteProject(this.data.project_id)
    .subscribe((res: Response) => {
      console.log(res);
      this.deleting = false;
      this.deleted = true;
    });
  }

  closeModal() {
    this.dialogRef.close();
    this.deleted = false;
  }

}
