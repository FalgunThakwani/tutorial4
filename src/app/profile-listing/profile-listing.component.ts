import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from './profile-data-source';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-listing',
  templateUrl: './profile-listing.component.html',
  styleUrls: ['./profile-listing.component.css']
})

export class ProfileListingComponent implements OnInit {

  dataSource!: Observable<Profile[]>;
  data!:Profile[];
  searchKey!: string;

  private getUrl="https://express-t4.onrender.com/api/users";
  constructor(private http: HttpClient,private router:Router) { }


  ngOnInit(): void {
     this.http.get<Profile[]>(this.getUrl).pipe(
      map(data => data.sort((a, b) => a.index - b.index))
    ).subscribe(profiles=>{
      this.data=profiles;
    });
  }
  profilePage(id:string){
    console.log(id);
    this.router.navigate(["/user-profile"],{queryParams:{id:id}})
  }

  get searchResult() {
    if (!this.searchKey) {
      return this.data;
    }
    return this.data.filter(item => item.name.toLowerCase().includes(this.searchKey.toLowerCase()));
  }

}
