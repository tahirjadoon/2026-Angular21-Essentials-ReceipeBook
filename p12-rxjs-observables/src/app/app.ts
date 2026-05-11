import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, effect, inject, NgZone, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  protected readonly title = signal('p12-rxjs-observables');

  interval = 0; //non signal solution
  interval2: string = '';
  interval$!: Observable<number>; //observable solution
  customInterval$ = new Observable((subscriber) => {
    let timesExexuted = 0;
    const interval = setInterval(() => {
      if(timesExexuted >= 5) {
        clearInterval(interval);
        subscriber.complete();
        return;
      } 
      subscriber.next({message: `New value @ ${new Date()}`});
      timesExexuted++;
    }, 2000);
  });
  clickCount = signal(0);

  private destroyRef = inject(DestroyRef);

  constructor(private zone: NgZone, private cdref: ChangeDetectorRef) {

    effect(() => {
      console.log(`Clicked button ${this.clickCount()} times`);
    });
  }

  ngOnInit(): void {
    
    //rxjs interval, defined in miliseconds
    const intervalSubscription = interval(1000).pipe(
      map(value => value * 2)
    ).subscribe({
      next: (value) => {
        /*
        this.zone.run(() => {
          this.interval = value;
          this.cdref.detectChanges();
        });
        */
        this.interval = value;
        this.cdref.detectChanges();
        //console.log(value);
      },
      complete: () => {
        console.log('complete');
      },
      error: (error) => {
        console.log(error);
      }

    });

    const customInterval = this.customInterval$.subscribe({
      next: (value: any) => {
        this.interval2 = value.message;
        this.cdref.detectChanges();
      },
      complete: () => {
        console.log('completed');
      }
    });

    this.destroyRef.onDestroy(() => {
      intervalSubscription.unsubscribe();
      customInterval.unsubscribe();
    });


    this.interval$ = interval(1000); //no need to unsubscribe, as the async pipe will handle it.
  }

  onclick() {
    this.clickCount.update(value => value + 1);
  }
}
