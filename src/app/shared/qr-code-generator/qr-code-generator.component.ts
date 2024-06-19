import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.css']
})
export class QrCodeGeneratorComponent {
  text: string = '';
  qrCodeUrl: string | null = null;

  constructor(private http: HttpClient) {}

  generateQRCode() {
    if (this.text) {
      this.http.post(`https://localhost:7050/api/qrcode/generate?text=${this.text}`, { responseType: 'blob' })
        .subscribe((blob) => {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            this.qrCodeUrl = event.target.result;
          };
          //reader.readAsDataURL(blob);
        });
    }
  }
}