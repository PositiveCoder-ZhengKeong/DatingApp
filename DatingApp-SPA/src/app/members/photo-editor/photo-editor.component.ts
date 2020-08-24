import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  // string because the photo url is a string
  // emit because output is emittign an event
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  currentMain: Photo;
  uploader: FileUploader;
  hasBaseDropZoneOver: false;
  baseUrl = environment.apiUrl;
  photoUrl: string;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  // function to initialize the FileUploader
  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      // after the image is uploded, remove from the upload queue
      removeAfterUpload: true,
      autoUpload: false,
      // 10 MB max size
      maxFileSize: 10 * 1024 * 1024
    });

    // to prevent error in the console (wild card allow origin error)
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    // after upload the photo, instantly show on the page
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        // "parse" is use to convert the "response" into object, because Photo is an object
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      // get the currentMain photo via a filter, the filter only return the photo that met the condition
      // [0] because of size 1
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      // this.getMemberPhotoChange.emit(photo.url);  // after this go to the parent component
      // change the photoUrl in the authservice (the centralize storage) via changeMemberPhoto function
      this.authService.changeMemberPhoto(photo.url);
      // change the current photo in the local storage to preven unchanged photo when broswer refresh
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(photo: Photo){
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === photo.id), 1);
        this.alertify.success('Photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }
}
