import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'signPadDemo';
  public options: Object = {
    // 'minWidth': 5,
    // 'canvasWidth': 500,
    // 'canvasHeight': 300
  };
  @ViewChild('signaturePad') public signaturePad: SignaturePad;
  @ViewChild('signatureContainer') public signatureContainer: ElementRef<HTMLElement>;
  signature: string;
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    setTimeout(() => {
      this.signaturePad.set('canvasWidth', this.signatureContainer.nativeElement.clientWidth)
      console.log('this.signatureContainer: ', this.signatureContainer.nativeElement.clientWidth);
      this.signaturePad.set('backgroundColor', 'rgb(255, 255, 255)');
      this.signaturePad.clear();
    });
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    // console.log(this.signaturePad.toDataURL());
    this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }

  @HostListener('window:resize', ['$event'])
  public setCanvasWidth(e?) {
    setTimeout(() => {
      this.signaturePad.set('canvasWidth', this.signatureContainer.nativeElement.clientWidth);
    });
    console.log('this.signatureContainer.nativeElement.clientWidth: ', this.signatureContainer.nativeElement.clientWidth);
    if (this.signature)
      this.signaturePad.fromDataURL(this.signature);
  }
}
