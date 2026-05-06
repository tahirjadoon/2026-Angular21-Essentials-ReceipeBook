import { Directive, input } from '@angular/core';

// will display a confirm prompt for the links when clicked
// name is appSafeLink
// it will get applied to anchor tags hence the "a" at the begining
// by default it is stand alone, so no need to mark it as true, which is the default
@Directive({
  selector: 'a[appSafeLink]',
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  }
})
export class SafeLinkDirective {
  queryParm = input('myapp', {alias: 'appSafeLink'});

  constructor() {
    console.log('SafeLinkDirective is active!');
  }

  onConfirmLeavePage(event: MouseEvent){
      const wantsToLeave = window.confirm('Are you sure you want to leave this page?');
      
      //user selected to leave the site
      if(wantsToLeave){
        const address = (event.target as HTMLAnchorElement).href;
        (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParm();
        return;
      }
      
      //user stays
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
  }
}
