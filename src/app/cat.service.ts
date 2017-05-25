import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable()
export class CatService {

  public environment = environment;

  constructor(private http: Http) {}

  getCats() {
    let headers = new Headers();
    return this.http.get(`${environment.API}/cats`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getFavoriteCats() {
    let headers = new Headers();
    return this.http.get(`${environment.API}/cats/favorites`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getVotes() {
    let headers = new Headers();
    return this.http.get(`${environment.API}/cats/votes`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  save(cat){
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return this.http.post(`${environment.API}/cats/${cat.id}/vote`, {score:cat.score})
      .map(this.extractData)
      .catch(this.handleError);
  }

  favorite(cat){
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');
    return this.http.post(`${environment.API}/cats/${cat.id}/favorite`, {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res:Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error:Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg:string;
    if ( error instanceof Response ) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
