import {
  Injectable,
  computed,
  signal,
  Injector,
  createComponent,
  EnvironmentInjector,
  ApplicationRef,
} from '@angular/core';
import { BusyComponent } from './busy.component/busy.component';

@Injectable({ providedIn: 'root' })
export class BusyService {
  private readonly count = signal(0);
  readonly isBusy = computed(() => this.count() > 0);
  private busyHostCreated = false;

  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
  ) {}

  begin(): void {
    if (!this.busyHostCreated) {
      this.ensureBusyHost();
      this.busyHostCreated = true;
    }
    this.count.update((c) => c + 1);
  }

  end(): void {
    this.count.update((c) => Math.max(0, c - 1));
  }

  private ensureBusyHost(): void {
    const environmentInjector = this.injector.get(EnvironmentInjector);
    const componentRef = createComponent(BusyComponent, {
      environmentInjector,
    });
    document.body.appendChild(componentRef.location.nativeElement);
    this.appRef.attachView(componentRef.hostView);
  }
}
