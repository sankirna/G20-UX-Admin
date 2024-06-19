import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.css']
})
export class QrCodeScannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.startScanner();
  }

  startScanner() {
    const qrCodeScanner = new Html5QrcodeScanner(
      "qr-reader", { fps: 10, qrbox: 250 }, false);
    qrCodeScanner.render(this.onScanSuccess,this.onErrorSuccess);
  }

  onScanSuccess(decodedText: string, decodedResult: any) {
    document.getElementById('qr-reader-results')!.innerText = decodedText;
  }

  onErrorSuccess(decodedText: string, decodedResult: any) {
    document.getElementById('qr-reader-results')!.innerText = decodedText;
  }
}
