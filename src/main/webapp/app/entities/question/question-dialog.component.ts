import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Question } from './question.model';
import { QuestionPopupService } from './question-popup.service';
import { QuestionService } from './question.service';
import { Answer, AnswerService } from '../answer';
import {FilteroptionsPipe} from '../../filteroptions.pipe';
@Component({
    selector: 'jhi-question-dialog',
    templateUrl: './question-dialog.component.html'
})
export class QuestionDialogComponent implements OnInit {

    question: Question;
    isSaving: boolean;
    answers: Answer[];
    isDuplicateOption = false;
    allowedAnswers: Answer[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private questionService: QuestionService,
        private answerService: AnswerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.answerService.query()
            .subscribe((res: HttpResponse<Answer[]>) => { this.answers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.validateOptions();
    }

    validateOptions() {
        this.allowedAnswers = [];
        this.isDuplicateOption = false;
        if (this.question.option1) {
            this.allowedAnswers.push(this.question.option1);
        }

        if (this.question.option2) {
            const index = this.allowedAnswers.findIndex((option) => option.id === this.question.option2.id);
            if ( index === -1) {
                this.allowedAnswers.push(this.question.option2);
            } else {
                this.isDuplicateOption = true;
            }
        }

        if (this.question.option3) {
            const index = this.allowedAnswers.findIndex((option) => option.id === this.question.option3.id);
            if ( index === -1) {
                this.allowedAnswers.push(this.question.option3);
            } else {
                this.isDuplicateOption = true;
            }
        }

        if (this.question.option4) {
            const index = this.allowedAnswers.findIndex((option) => option.id === this.question.option4.id);
            if ( index === -1) {
                this.allowedAnswers.push(this.question.option4);
            } else {
                this.isDuplicateOption = true;
            }
        }

        /**
         * this.duplicateOptions =  this.question.option1.id === this.question.option2.id ||
                                 this.question.option1.id === this.question.option3.id ||
                                 this.question.option1.id === this.question.option4.id ||
                                 this.question.option2.id === this.question.option3.id ||
                                 this.question.option2.id === this.question.option4.id ||
                                 this.question.option3.id === this.question.option4.id;
         *
         */

                                 return false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.question.id !== undefined) {
            this.subscribeToSaveResponse(
                this.questionService.update(this.question));
        } else {
            this.subscribeToSaveResponse(
                this.questionService.create(this.question));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Question>>) {
        result.subscribe((res: HttpResponse<Question>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Question) {
        this.eventManager.broadcast({ name: 'questionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAnswerById(index: number, item: Answer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-question-popup',
    template: ''
})
export class QuestionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private questionPopupService: QuestionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.questionPopupService
                    .open(QuestionDialogComponent as Component, params['id']);
            } else {
                this.questionPopupService
                    .open(QuestionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
