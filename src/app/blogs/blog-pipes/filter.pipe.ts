import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string): any {
    if (value.length === 0 || filterString == '') {
      return value;
    }

    //console.log(filterString) // For DEBUGGING
    //console.log(value); // For DEBUGGING

    const resultArray = [];

    for (const item of value) {

      if (item.name.toLowerCase().includes(filterString.toLowerCase())){
        resultArray.push(item);
      }
    }

    return resultArray;

  }

}
