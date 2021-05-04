import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FriendRequestService } from 'app/services/friend-request.service';
import { IFriendRequest, FriendRequest } from 'app/shared/model/friend/friendRequest.model';
import { IDummy, Dummy } from 'app/shared/model/dummy/dummy.model';
import { Router } from '@angular/router';
import { MessageTestService } from 'app/services/messageTest.service';
import { Principal, IUser, User } from 'app/core';
import { ImagePostUploadService } from 'app/services/post-handle.service';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared';





@Component({
  selector: 'app-friend-request-viewer',
  templateUrl: './friend-request-viewer.component.html',
  styleUrls: ['./friend-request-viewer.component.scss']
})
export class FriendRequestViewerComponent implements OnInit {
  friendProfilePic: string;
  requestDetails : IFriendRequest;
 
  //dummyDetails: Dummy[] = [];
  friend:FriendRequest[]=[];
  user: IUser
  ids: string[]=[];
  requestPersonDetailsMap=new Map();
  accept: boolean;
  // displayedColumns: string[] = ['position', 'name'];
  // dataSource = ELEMENT_DATA;

  constructor(
    private friendRequestService: FriendRequestService,
    private router : Router,
    private principal: Principal,
    private userProfileService: ImagePostUploadService
  ) { }

  ngOnInit() {
   
  this.accept = false;
    this.user = new User();
    this.requestDetails=new FriendRequest();
    this.friendProfilePic = "../../../../assets/images/avatars/profile.jpg" 
    this.principal.identity().then(
      account=>{
        this.user = account;
        console.log("User Id :"+this.user.id)
        this.getRequests(this.user.id)
      }
    )

  
  }

 

  getRequests(id){
    this.friendRequestService.getAllRequests(id).subscribe(
      res=>{
        console.log("all requests "+JSON.stringify(res.body))
        this.ids = res.body;

        if(this.ids.length!=0){
          this.getProfileDetails(this.ids)
        }
       
        // this.friend=res.body;
        // console.log("This dummy details"+JSON.stringify(this.dummyDetails))
      },err=>{
        console.log("Error in loading data")
      }
    )
  }

  getProfileDetails(idSet) {

   this.userProfileService.getPostUsersDetails(idSet).subscribe(
     res=>{
       console.log("User details :"+JSON.stringify(res.body) )
       this.requestPersonDetailsMap = res.body;
     },err=>{
       console.log("errorrr")
     }
   )
  }

  acceptRequest(detail) {
    console.log("Detail"+JSON.stringify(detail));
    
    this.requestDetails.userId = detail.userId;
    this.requestDetails.acceptedDate = new Date()!=null? moment(new Date(),DATE_TIME_FORMAT):null;
    this.requestDetails.requestedPersonId = this.user.id;
    console.log("accepted: "+JSON.stringify(this.requestDetails))
    this.friendRequestService.acceptFriendRequest(this.requestDetails).subscribe(
      res=>{
        this.accept = true;
        console.log("Successfully updated"+res.body)
      },
      err=>{
        
        console.log("error in updating"+err)
      }
    )
  }

  viewAllRequests() {
        this.router.navigate(['/friendRequestMain'])
        
  }

  deleteRequest(detail) {

  }

}
