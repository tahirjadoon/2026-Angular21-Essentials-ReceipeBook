import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from '../auth/models/auth.model';
import { AuthService } from '../auth/services/auth.service';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective {
  permisison = input.required<Permission>({alias: 'appAuth'});
  authService = inject(AuthService);

  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const hasPermission = this.authService.hasPermission(this.permisison());
      if (hasPermission) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
      else{
        this.viewContainerRef.clear();
      }
    });
  }
}
