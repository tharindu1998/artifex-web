import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef, ViewContainerRef, Input } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { Subject } from "rxjs";
import { ProfileService } from "app/main/boards/artden/profile.service";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: 'shared-albums',
    templateUrl: './shared-albums.component.html', 
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class SharedAlbumsComponent implements OnInit, OnDestroy {
    ngOnInit(): void {
        
    }  
      ngOnDestroy(): void {
     
    }


}
