import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, inject, NgZone, OnInit, signal } from '@angular/core';
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
  interval$!: Observable<number>; //observable solution

  private destroyRef = inject(DestroyRef);

  constructor(private zone: NgZone, private cdref: ChangeDetectorRef) {}

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
    this.destroyRef.onDestroy(() => {
      intervalSubscription.unsubscribe();
    });


    this.interval$ = interval(1000); //no need to unsubscribe, as the async pipe will handle it.
  }
}
