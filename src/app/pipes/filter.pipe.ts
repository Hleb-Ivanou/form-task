import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../mock/skill.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Skill[], compareValue: any): any {
    return value.filter(el => el.roleIdArray.includes(compareValue));
  }

}
