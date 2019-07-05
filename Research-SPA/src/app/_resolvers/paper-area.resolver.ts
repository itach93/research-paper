import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaperService } from '../_services/paper.service';

@Injectable()
export class PaperAreaResolver implements Resolve<any> {

  constructor(private paperService: PaperService, private router: Router, private alertify: AlertifyService) {}

  resolve(): Observable<any> {
    return this.paperService.getAreas().pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving paper areas data');
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
