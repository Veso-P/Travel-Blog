import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {

    transform(value: any, limit: number): any {

        return value.sort((a, b) => b.createdAt - a.createdAt).slice(0, limit);

    }

}