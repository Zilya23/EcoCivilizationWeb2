import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { Location, NgFor } from '@angular/common';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.css'],
})
export class ApplicationInfoComponent {
  applicationID: any;
  currentPhoto: any;
  partUser: any;

    constructor(private router: Router, private data: ConfigService, private route: ActivatedRoute) {
      const id = this.route.snapshot.paramMap.get('id');
      this.data.getApplication(id)
      .subscribe((info:any) => {
        this.applicationID = info;
        this.currentPhoto = info.photoApplications[0].photo;
        this.partUser = this.applicationID.applicationUsers.length;
      });
    }

    picPhoto(photo: any) {
      this.currentPhoto = photo;
    }

    partApplication() {
      this.data.partApplicationUser(this.applicationID.id, localStorage.getItem('AUTH_TOKEN'))
      .subscribe(response => {
        
      });
      //this.partUser = this.partUser + 1;
    }
  }
