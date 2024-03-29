import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Release} from '../Model/release';
import {ReleaseAdapter} from './adapter/release-adapter';
import {Config} from '../Model/config';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  private BASE_URL = Config.releaseBaseURL;

  constructor(private http: HttpClient, private adapter: ReleaseAdapter) { }

  /**Retrieves releases with a GET request to kpi-api
   */
  getReleases(): Observable<Release[]> {
    return this.http.get(this.BASE_URL).pipe(
        map((data: any[]) => data.map((item) => this.adapter.adapt(item)))
    );
  }
}
