import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient) { }

  getProductInfo(barCode: string) {
    return this.http.get('http://st.omniaccounts.co.za:55683/Report/Stock Export?CompanyName=SA Example Company [Demo]&UserName=Guest&password=Dev2021&IBarCode=' + barCode).pipe(
      map (data => {
        return data;
      })
    )
  }
}
