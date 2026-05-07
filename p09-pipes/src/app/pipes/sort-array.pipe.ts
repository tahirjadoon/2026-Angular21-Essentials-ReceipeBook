import { Pipe, PipeTransform } from "@angular/core";
import { SORT_ORDER, SortOrder } from "../models/sortOrder.model";

@Pipe({
  name: 'sortArray',
  pure: false, //to disable caching mechanism
})
export class SortArrayPipe implements PipeTransform{

  transform(value: string[] | number[], direction: SortOrder = SORT_ORDER.asc) {
    const sorted = [...value];
    sorted.sort((a, b) => {
      if (direction === SORT_ORDER.asc) {
        return a > b ? 1 : -1;
      } else {
        return a > b ? -1 : 1;
      }
    });
    return sorted;
  }

}