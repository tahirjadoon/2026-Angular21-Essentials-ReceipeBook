import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-server-status',
  imports: [CommonModule],
  templateUrl: './server-status.html',
  styleUrl: './server-status.css',
})
export class ServerStatusComponent implements OnInit, AfterViewInit {
  //had to use signal since the project is zoneless
  //subscriptions, interval ad setInterval, settimeout will not result in change detection and view update
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');

  private setIntervalId?: number;
  private intervalSubscription?: Subscription;
  private destroyRef = inject(DestroyRef);


  constructor() {
    console.log('constructor');
    //angular will setup a subecription to currentStatus signal
    effect(() => {
      console.log(this.currentStatus()); 
    });
    
  }

  /*
  ngOnDestroy(): void {
    console.log('ngOnDestroy');

    if(this.setIntervalId) clearInterval(this.setIntervalId);

    this.intervalSubscription?.unsubscribe();
  
  }
  */

  ngOnInit(): void {
    console.log('ngOnInit');
    this.changeStatusByInterval();
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }


  changeStatusByInterval(){
    /*
      this.setIntervalId = setInterval(() => {
        const random = Math.random(); //0 - 0.9999999...
        if(random < 0.5)
          this.currentStatus = 'online';
        else if(random < 0.9) 
          this.currentStatus = 'offline';
        else 
          this.currentStatus = 'unknown';

        const currentDate = new Date();
        console.log(`${currentDate.toISOString()} Server status: ${this.currentStatus}`);
      }, 5000); //5secs
    */
    this.intervalSubscription = interval(5000).subscribe(() => {
      const random = Math.random();
      let newStatus: 'online' | 'offline' | 'unknown';

      if (random < 0.5) newStatus = 'online';
      else if (random < 0.9) newStatus = 'offline';
      else newStatus = 'unknown';

      this.currentStatus.set(newStatus);

      const currentDate = new Date();
      //console.log(`${currentDate.toISOString()} Server status: ${this.currentStatus}`);
    });

    this.destroyRef.onDestroy(() => {
      console.log('onDestroy');
      //if(this.setIntervalId) clearInterval(this.setIntervalId);
      this.intervalSubscription?.unsubscribe();
    });
  }
}
