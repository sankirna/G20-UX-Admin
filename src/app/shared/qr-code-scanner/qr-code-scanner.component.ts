import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.css']
})
export class QrCodeScannerComponent implements OnInit {
  @Input() isShow = true;
  sucessText: string="";
  @Output() onScanSuccessCallback: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.startScanner();
  }

  startScanner() {
    this.isShow = true;
    const qrCodeScanner = new Html5QrcodeScanner(
      "qr-reader", { fps: 10, qrbox: 250 }, false);
    qrCodeScanner.render(this.onScanSuccess,this.onErrorSuccess);
  }

  onScanSuccess(decodedText: string, decodedResult: any) {
    this.sucessText=decodedText;
    this.onScanSuccessCallback.emit(this.sucessText);
    document.getElementById('qr-reader-results')!.innerText = decodedText;
    this.sucessText=decodedText;
  }

  onErrorSuccess(decodedText: string, decodedResult: any) {
    document.getElementById('qr-reader-results')!.innerText = decodedText;
  }
}
