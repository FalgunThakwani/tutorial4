import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../profile-listing/profile-data-source';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private getUrl = "https://express-t4.onrender.com/api/users/";
  dataSource!: Profile;


  constructor(private http:HttpClient,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
       const userId = params['id'];
       console.log(userId)
       this.getUrl+=userId
    });
  }

  ngOnInit(): void {
   this.http.get<Profile>(this.getUrl).subscribe(user => this.dataSource=user);
  }

}
