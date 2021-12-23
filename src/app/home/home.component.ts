import { Component, OnInit, ViewChild } from '@angular/core';
import { OperationsService } from '../_services/operations.service';
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";

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

  productData: any;

  constructor(private operationsService: OperationsService) { }

  search() {
    this.operationsService.getProductInfo(this.barcodeValue).subscribe((data: any) => {
     

      if (data) {
        this.productData = data.stock_export;

        console.log('loadProductInfo data productData', this.productData);
      } else {

      }
    }, error => {
      console.log('Error ', error);
    });
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
