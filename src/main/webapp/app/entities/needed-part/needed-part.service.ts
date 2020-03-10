import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INeededPart } from 'app/shared/model/needed-part.model';

type EntityResponseType = HttpResponse<INeededPart>;
type EntityArrayResponseType = HttpResponse<INeededPart[]>;

@Injectable({ providedIn: 'root' })
export class NeededPartService {
  public resourceUrl = SERVER_API_URL + 'api/needed-parts';

  constructor(protected http: HttpClient) {}

  create(neededPart: INeededPart): Observable<EntityResponseType> {
    return this.http.post<INeededPart>(this.resourceUrl, neededPart, { observe: 'response' });
  }

  update(neededPart: INeededPart): Observable<EntityResponseType> {
    return this.http.put<INeededPart>(this.resourceUrl, neededPart, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INeededPart>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INeededPart[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
