import { Pipe, PipeTransform } from '@angular/core';
import { Answer } from './entities/answer/answer.model';
import { Question } from './entities/question/question.model';

@Pipe({
  name: 'filteroptions'
})
export class FilteroptionsPipe implements PipeTransform {

  transform(items: Answer[], args?: string): any {
    if (!items || !args) {
      return items;
    }
    const answers: Answer[] = [];
    items.filter((item) =>  {
      if (item.text.toLocaleLowerCase().indexOf(args.toLocaleLowerCase()) !== -1) {
          answers.push(item);
      }
    });

    return answers;
  }

}
