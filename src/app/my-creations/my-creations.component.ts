import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-creations',
  templateUrl: './my-creations.component.html',
  styleUrls: ['./my-creations.component.scss'],
  animations: fuseAnimations
})
export class MyCreationsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  viewWritingInside(){
    this.router.navigate(['/creations/writings'])
  }

  viewComicInside(){
    this.router.navigate(['/creations/comics'])
  }

  viewDrawingInside(){
    
  }
}
