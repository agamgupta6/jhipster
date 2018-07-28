import { BaseEntity } from './../../shared';

export class Answer implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
    ) {
    }
}
