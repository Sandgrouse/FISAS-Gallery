import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GalleryService } from '../_services';
import { projects } from './mock-projects';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Project } from '../_models';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [GalleryService]
})
export class GalleryComponent implements OnInit, AfterViewInit {


  projects = projects;
  images = this.projects[3].images;
  project$: Observable<Project>;

  constructor(
    private galleryService: GalleryService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.project$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.galleryService.getProject(params.get('id')))
    );
  }


  ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    // this.getImages();
  }

  backToMap() {
    this.router.navigate(['map']);
  }

  /* getImages() {
    // const gallery = this.gallery;
    $.ajax({
      url: 'https://api.flickr.com/services/rest/',
      data: {
        format: 'json',
        method: 'flickr.interestingness.getList',
        per_page : this.numOfImages,
        api_key: 'b51d3a7c3988ba6052e25cb152aecba2' // this is my own API key, please use yours
      },
      dataType: 'jsonp',
      jsonp: 'jsoncallback'
    })
    .done(function (data){
      let loadedIndex = 1, isVideo;
      // add the videos to the collection
      data.photos.photo = data.photos.photo.concat(this.videos);
      console.log(data);
      $.each( data.photos.photo, function(index, photo){

        isVideo = photo.thumb ? true : false;
        // http://www.flickr.com/services/api/misc.urls.html
        const url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret,
        img = document.createElement('img');

        // lazy show the photos one by one
        img.onload = function(e){
          img.onload = null;
          const link = document.createElement('a'),
          li = document.createElement('li');
          link.href = this.largeUrl;

          link.appendChild(this);
          if( this.isVideo ){
            link.rel = 'video';
            li.className = 'video'
          }
          li.appendChild(link);
          gallery[0].appendChild(li);

          setTimeout( function(){
            $(li).addClass('loaded');
          }, 25 * loadedIndex++);
        };

        img['largeUrl'] = isVideo ? photo.url : url + '_b.jpg';
        img['isVideo'] = isVideo;
        img.src = isVideo ? photo.thumb : url + '_t.jpg';
        img.title = photo.title;
      });

      // finally, initialize photobox on all retrieved images
      $('#gallery').photobox('a', { thumbs: true }, callback);
      // tslint:disable-next-line:max-line-length
      // using setTimeout to make sure all images were in the DOM, before the history.load() function is looking them up to match the url hash
      setTimeout(window._photobox.history.load, 1000);
      function callback() {
        console.log('callback for loaded content:', this);
      }
    });
  }

  getImages2 () {
    this.galleryService.getImages()
    .subscribe((data) => console.log(data));
  }*/


}
