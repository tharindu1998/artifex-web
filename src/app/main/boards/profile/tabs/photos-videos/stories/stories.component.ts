import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef, ViewContainerRef, Input } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { Subject } from "rxjs";
import { ProfileService } from "app/main/boards/artden/profile.service";
import { takeUntil } from "rxjs/operators";
import { ImagePostUploadService } from "app/services/post-handle.service";
import { Principal, IUser, User } from "app/core";
import { ImagePost } from "app/shared/model/userProfile/image.post";

@Component({
    selector: 'stories',
    templateUrl: './stories.component.html', 
    styleUrls: ['./stories.scss'],
    encapsulation: ViewEncapsulation.None,

    animations: fuseAnimations
})

export class StoriesComponent implements OnInit, OnDestroy {
  user: IUser;
  nextPageVideos: number;
  VideoList: ImagePost[] = [];
  constructor(
    private imagePostService: ImagePostUploadService,
    private prinipal: Principal
  ){

  }

    ngOnInit(): void {
      this.user = new User();
        this.prinipal.identity().then(
          account=>{
            this.user = account
            this.getVideos()
          }
        )
    }  
      ngOnDestroy(): void {
     
    }

    getVideos(){
      this.imagePostService.getAllPictures(this.user.id,'video',this.nextPageVideos).subscribe(
        res=>{
          // alert(JSON.stringify(res.body))

          if(this.nextPageVideos===0){
            this.VideoList = res.body;
           
        }else{


            res.body.forEach(element=>{
                this.VideoList.push(element)
            })
        }

        this.nextPageVideos++;
        }
      )
    }


}
