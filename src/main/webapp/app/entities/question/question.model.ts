import { BaseEntity } from './../../shared';

export class Question implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
        public option1?: BaseEntity,
        public option2?: BaseEntity,
        public option3?: BaseEntity,
        public option4?: BaseEntity,
        public answer?: BaseEntity,
    ) {
    }
}
