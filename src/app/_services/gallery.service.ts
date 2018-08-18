import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Project, Data } from '../_models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { catchError } from 'rxjs/operators';
import { api_base } from '../constants';



@Injectable()
export class GalleryService {


  project: Project;
  projects: Project[];

  private url = 'https://api.flickr.com/services/rest/';
  private serverUrl = api_base;


  constructor(private http: HttpClient) {
    // this.testApi();
  }


  getProjects(): Observable<Data> {
    return this.http.get<Data>(this.serverUrl + 'projects');
  }

 /*  testApi() {

    const apiUrl = this.serverUrl + '/projects/';

     this.http.get<Project[]>(apiUrl).subscribe((data) => {
      console.table(data);
    });

    return this.http.get<Project>(this.serverUrl + '/projects/' + 2).subscribe((data) => {
      console.log(data);
    });

    // this.testPost(apiUrl);

  } */

  getProject(id: number | string) {
    return this.http.get<Project>(this.serverUrl + 'projects/' + id);
  }

  createProject(payload: FormData) {

    const apiCreateEndpoint = this.serverUrl + 'projects';
    const req = new HttpRequest('POST', apiCreateEndpoint, payload, {
      reportProgress: true // for progress data
    });
    return this.http.request(req);
  }
  addImages (payload: FormData) {

    const apiCreateEndpoint = this.serverUrl + 'addimage';
    const req = new HttpRequest('POST', apiCreateEndpoint, payload, {
      reportProgress: true // for progress data
    });
    return this.http.request(req);
  }

  deleteProject (id: number | string) {
    const url = this.serverUrl + 'projects/' + id;
    console.log(url, id);

    return this.http.delete(url);
    /* .pipe(
      catchError(this.handleError('deleteProject'))
    ); */

  }

  handleError(arg0: any): any {
    throw new Error('Method not implemented.');
  }


}
