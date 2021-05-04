import { Component, OnInit, ViewEncapsulation } from '@angular/core'; 

import { fuseAnimations } from '@fuse/animations';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'], 
  animations: fuseAnimations
})
export class FeedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
