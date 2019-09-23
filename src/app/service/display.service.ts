import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  makeTable(columnlist, resourceList, displayResult){
    for(let row of resourceList){
      let rowcnt: object[] = [];
      for(let columnname of columnlist){
        rowcnt.push({columnname: ''});
      }

      rowcnt['cost_code'] = row.cost_code;
      rowcnt['name'] = row.name;

      for(let columnpair of row.columns){
        rowcnt[columnpair[0]] = columnpair[1];
      }

      displayResult.push(rowcnt);
    }
  }
}
