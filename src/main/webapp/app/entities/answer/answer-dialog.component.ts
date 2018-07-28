import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Answer } from './answer.model';
import { AnswerPopupService } from './answer-popup.service';
import { AnswerService } from './answer.service';

@Component({
    selector: 'jhi-answer-dialog',
    templateUrl: './answer-dialog.component.html'
})
export class AnswerDialogComponent implements OnInit {

    answer: Answer;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private answerService: AnswerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.answer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.answerService.update(this.answer));
        } else {
            this.subscribeToSaveResponse(
                this.answerService.create(this.answer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Answer>>) {
        result.subscribe((res: HttpResponse<Answer>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Answer) {
        this.eventManager.broadcast({ name: 'answerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-answer-popup',
    template: ''
})
export class AnswerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private answerPopupService: AnswerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.answerPopupService
                    .open(AnswerDialogComponent as Component, params['id']);
            } else {
                this.answerPopupService
                    .open(AnswerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
