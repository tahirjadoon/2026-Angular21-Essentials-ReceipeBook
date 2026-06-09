import { CanDeactivateFn } from "@angular/router";
import { NewTaskComponent } from "../../tasks/new-task/new-task.component";

export const canLeaveEditPageGuard: CanDeactivateFn<NewTaskComponent> = (component, currentRoute, currentState, nextState) => {
  if(component.submitted){
    return true;
  }
  
  if(component.enteredTitle() || component.enteredDate() || component.enteredSummary()){
    const result = window.confirm("You have unsaved changes. Do you really want to leave?");
    return result;
  }
  return true;
}