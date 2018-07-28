import { Pipe, PipeTransform } from '@angular/core';
import { Answer } from './entities/answer/answer.model';
import { Question } from './entities/question/question.model';

@Pipe({
  name: 'bestmatchfilter'
})
export class BestmatchfilterPipe implements PipeTransform {

  transform(items: Answer[], args?: string): any {
    let bestmatch = '';
    if (!items || !args) {
      return bestmatch;
    }
    const bestmatchArray = items.slice(0, 3);
    bestmatchArray.filter((bestmatchtext) => bestmatch = bestmatch + bestmatchtext.text + ', ' );
    return bestmatch.slice(0, bestmatch.length - 1);
  }

}
