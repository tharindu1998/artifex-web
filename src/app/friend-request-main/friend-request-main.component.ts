import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FriendRequestService } from 'app/services/friend-request.service';
import { Dummy } from 'app/shared/model/dummy/dummy.model';
import { FriendRequest, IFriendRequest } from 'app/shared/model/friend/friendRequest.model';
import { Principal, IUser, User } from 'app/core';
import { ImagePostUploadService } from 'app/services/post-handle.service';
import { DATE_TIME_FORMAT } from 'app/shared';
import * as moment from 'moment';

@Component({
  selector: 'app-friend-request-main',
  templateUrl: './friend-request-main.component.html',
  styleUrls: ['./friend-request-main.component.scss'],
  animations: fuseAnimations
})
export class FriendRequestMainComponent implements OnInit {
  requestDetails: IFriendRequest
  user:IUser
  friend:FriendRequest[]=[];
  ids: string[]=[];
  requestPersonDetailsMap=new Map();
  accept: boolean;
  friendProfilePic: string;
  userId: any;
  constructor(
    private friendService: FriendRequestService,
    private principal: Principal,
    private userProfileService: ImagePostUploadService
  ) { }

  ngOnInit() {
    this.user = new User();
    this.requestDetails = new FriendRequest()
    this.friendProfilePic = "../../../../assets/images/avatars/profile.jpg" 
    this.principal.identity().then(
      account=>{
        this.user = account
        this.userId = this.user.id
        // alert(this.user.id)
        this.getRequests(this.user.id)
      }
    )
  }
  getRequests(id){
    this.friendService.getAllRequests(id).subscribe(
      res=>{
        //console.log("all requests "+JSON.stringify(res.body))
        this.ids = res.body;

        if(this.ids.length!=0){
          this.getProfileDetails(this.ids)
        }
       
        // this.friend=res.body;
        // //console.log("This dummy details"+JSON.stringify(this.dummyDetails))
      },err=>{
        //console.log("Error in loading data")
      }
    )
  }


  getProfileDetails(idSet) {

    this.userProfileService.getPostUsersDetails(idSet).subscribe(
      res=>{
        //console.log("User details :"+JSON.stringify(res.body) )
        this.requestPersonDetailsMap = res.body;
      },err=>{
        //console.log("errorrr")
      }
    )
   }


   acceptRequest(detail) {
    //console.log("Detail"+JSON.stringify(detail));
    
    this.requestDetails.userId = detail.userId;
    this.requestDetails.acceptedDate = new Date()!=null? moment(new Date(),DATE_TIME_FORMAT):null;
    this.requestDetails.requestedPersonId = this.user.id;
    //console.log("accepted: "+JSON.stringify(this.requestDetails))
    this.friendService.acceptFriendRequest(this.requestDetails).subscribe(
      res=>{
        this.accept = true;
        //console.log("Successfully updated"+res.body)
      },
      err=>{
        
        //console.log("error in updating"+err)
      }
    )
  }
 

  deleteFriendRequest(detail){
    // alert(JSON.stringify(detail))
    this.friendService.deleteRequest(this.user.id,detail.userId).subscribe(
      res=>{
        // alert("deleted")
        this.getRequests(this.user.id);
      },err=>{
        // alert("cannot delete"+JSON.stringify(err))
      }
    )
  }

}
