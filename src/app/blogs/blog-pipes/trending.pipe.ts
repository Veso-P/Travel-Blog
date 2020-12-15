import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trendingPipe'
})
export class TrendingPipe implements PipeTransform {

    transform(value: any, limitTrending: number): any {
        //console.log(value);
        let firstArr = [];
        let secondArr = [];

        value.forEach(el => {
            if (el.hasOwnProperty('comments') == false) {
                firstArr.push(el);
            } else {
                secondArr.push(el);
            }
            
        })
        
        // secondArr.sort((a, b) => {
        //     a.comments.length - b.comments.length;
        // })

        // }).slice(0, limitTrending);

        //console.log(firstArr);
        //console.log(secondArr);

        return secondArr.sort((a, b) => b.comments.length - a.comments.length).concat(firstArr).slice(0, limitTrending);



    }

}