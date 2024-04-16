import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasPassed'
})
export class HasPassedPipe implements PipeTransform {
  transform(value: Date): boolean {

    let compareDate = new Date(value);
    let today = new Date();
    compareDate.setDate(compareDate.getDate() + 1);

    return compareDate < today;
  }
}
