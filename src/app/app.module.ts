import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { RoutingModule } from './routing.module';
import { RouterModule } from '@angular/router';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatListModule, MatProgressBarModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';




import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';



import { AppComponent } from './app.component';
import { NguiMapModule} from '@ngui/map';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MapComponent } from './map/map.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProjectFoldersComponent } from './project-folders/project-folders.component';

import { APP_BASE_HREF } from '@angular/common';
import { AddProjectComponent, UploadImageDialogComponent } from './addProject/addProject.component';
import { GalleryService } from './_services';
import { LoginComponent } from './login/login.component';
import { UserService } from './_services/user.service';
import { AuthenticationService } from './_services/authentication.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthGuard } from './_guards/auth.guard';
import { AddImagesComponent } from './add-images/add-images.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { DeleteSuccessComponent } from './confirm-delete/DeleteSuccess/DeleteSuccess.component';
import { TruncateModule } from '@yellowspot/ng-truncate';
import { RegisterComponent } from './Register/Register.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    AddImagesComponent,
    GalleryComponent,
    ConfirmDeleteComponent,
    ProjectFoldersComponent,
    AddProjectComponent,
    DeleteSuccessComponent,
    UploadImageDialogComponent,
    RegisterComponent
  ],
   imports: [
    BrowserModule,
    TruncateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GalleryModule.forRoot(),
    LightboxModule.forRoot(),
    GallerizeModule,
    MatGridListModule, MatSlideToggleModule,
    MatButtonModule, MatCardModule, MatFormFieldModule,
    MatIconModule, MatSelectModule,
    MatInputModule, MatDatepickerModule, MatSnackBarModule,
    MatNativeDateModule, MatProgressSpinnerModule,
    MatDialogModule, MatListModule, MatProgressBarModule,

    RouterModule.forRoot([], {useHash: true}),
    NgbModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDZeWQdbJXb-6PMmRBvfxHKdj6MJQs4jDY'})
  ],
  entryComponents: [
    AddProjectComponent, AddImagesComponent, DeleteSuccessComponent,
    UploadImageDialogComponent, LoginComponent, ConfirmDeleteComponent,
    RegisterComponent
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    GalleryService, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
