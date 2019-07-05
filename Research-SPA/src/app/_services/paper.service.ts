import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paper } from '../_models/paper';

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAreas(): Observable<any> {
    return this.http.get(this.baseUrl + 'paper/areas');
  }

  createPaper(paper) {
    return this.http.post(this.baseUrl + 'paper/create', paper);
  }
}
