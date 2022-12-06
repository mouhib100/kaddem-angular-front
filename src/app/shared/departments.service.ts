import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class departmentsService {
  // we are going to do http call, we need to have http client, so inject http client
  constructor(public http: HttpClient) {}

  /****************************************************Service-universite*****************************************************/
  // what we have to post, we have to post a data of type any, and this data will be posted on this server

  getDepartements(): Observable<any> {
    return this.http.get<any>('http://localhost:8090/kaddem/Departement/all');
  }

  addDepartement(data: any) {
    return this.http.post<any>(
      'http://localhost:8090/kaddem/Departement/adddepart',
      data
    );
  }

  putDepartement(data: any) {
    return this.http.put<any>(
      'http://localhost:8090/kaddem/Departement/Updatedepart',
      data
    );
  }

  deleteDepartement(idDepar: number) {
    return this.http.delete<any>(
      'http://localhost:8090/kaddem/Departement/deletedepart/' + idDepar
    );
  }
}
