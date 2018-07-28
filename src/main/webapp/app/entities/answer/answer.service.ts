import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Answer } from './answer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Answer>;

@Injectable()
export class AnswerService {

    private resourceUrl =  SERVER_API_URL + 'api/answers';

    constructor(private http: HttpClient) { }

    create(answer: Answer): Observable<EntityResponseType> {
        const copy = this.convert(answer);
        return this.http.post<Answer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(answer: Answer): Observable<EntityResponseType> {
        const copy = this.convert(answer);
        return this.http.put<Answer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Answer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Answer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Answer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Answer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Answer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Answer[]>): HttpResponse<Answer[]> {
        const jsonResponse: Answer[] = res.body;
        const body: Answer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Answer.
     */
    private convertItemFromServer(answer: Answer): Answer {
        const copy: Answer = Object.assign({}, answer);
        return copy;
    }

    /**
     * Convert a Answer to a JSON which can be sent to the server.
     */
    private convert(answer: Answer): Answer {
        const copy: Answer = Object.assign({}, answer);
        return copy;
    }
}
