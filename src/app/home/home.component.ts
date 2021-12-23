import { Component, OnInit, ViewChild } from '@angular/core';
import { OperationsService } from '../_services/operations.service';
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(BarcodeScannerLivestreamComponent) 
  barcodeScanner!: BarcodeScannerLivestreamComponent;

  barcodeValue: any;
  isOpen: boolean = false;
  isShowInfo: boolean = false;
  productData: any;
  logoImg: string = "";

  constructor(private operationsService: OperationsService, private toastr: ToastrService) { }

  search() {
    this.operationsService.getProductInfo(this.barcodeValue).subscribe((data: any) => {
     

      if (data) {
        if (data.stock_export.length != 0) {
          this.productData = data.stock_export;
          this.logoImg = "http://st.omniaccounts.co.za:55683/BranchLogo/HO.jpg?CompanyName=SA%20Example%20Company%20[Demo]&UserName=Guest";
          this.isShowInfo = true;
          console.log('loadProductInfo data productData', this.productData);
        } else {
          this.toastr.error('No info', 'No data found');
        }
      } else {
        this.toastr.error('No info', 'No data found');
      }
    }, error => {
      console.log('Error ', error);
      this.toastr.error(error.message, 'Error found');
    });
  }

  clear() {
    this.isShowInfo = false;
    this.barcodeValue = "";
  }

  openScanner() {
    this.barcodeScanner.start();
    this.isOpen = true;
  }

  closeScanner() {
    this.barcodeScanner.stop();
    this.isOpen = false;
  }

  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started: any) {
    console.log(started);
  }

  ngOnInit(): void {
  }

}
