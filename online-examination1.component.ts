import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'jhi-online-examination1',
  templateUrl: './online-examination1.component.html',
  styles: []
})
export class OnlineExamination1Component implements OnInit, OnDestroy {

   countDown: Subscription;
   count = 180;
   timeleft: string;
  constructor() {
    // Set initial time if not present insessiostorage
    if (sessionStorage.getItem('timeleft')) {
      if ( parseInt(sessionStorage.getItem('timeleft'), 10) === 0) {
        sessionStorage.removeItem('timeleft');
      }else {
        this.count = parseInt(sessionStorage.getItem('timeleft'), 10);
      }
    }

    this.countDown = Observable.interval(1000).take(this.count).subscribe((x) => {
      sessionStorage.setItem('timeleft', (--this.count).toString());
      this.secondsToTime();
    });

   }

  ngOnInit() {
    this.countDown.unsubscribe();
   }

ngOnDestroy() {
}

   secondsToTime()  {
    this.timeleft = '';
    const seconds = parseInt(sessionStorage.getItem('timeleft'), 10);
    const minutes = Math.floor(seconds / 60);
    const secs = 60 - ((3600 - seconds) % 60);
    if (minutes < 10) {
      this.timeleft = this.timeleft.concat('0'.concat(minutes.toString()));
    }else {
      this.timeleft = this.timeleft.concat(minutes.toString());
    }
    this.timeleft = this.timeleft.concat(':');
    if (secs < 10) {
      this.timeleft = this.timeleft.concat('0'.concat(secs.toString()));
    }else {
      this.timeleft = this.timeleft.concat(secs.toString());
    }
   }
}
