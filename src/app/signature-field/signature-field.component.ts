import { Component, OnInit, forwardRef, AfterViewInit, ViewChild, HostListener, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature-field',
  templateUrl: './signature-field.component.html',
  styleUrls: ['./signature-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureFieldComponent),
      multi: true,
    },
  ]
})
export class SignatureFieldComponent implements ControlValueAccessor, AfterViewInit {

  @ViewChild('signaturePad') public signaturePad: SignaturePad;
  @ViewChild('signatureContainer') public signatureContainer: ElementRef<HTMLElement>;

  
  public options: Object = {};

  public _signature: any = null;

  public propagateChange: Function = null;

  get signature(): any {
    return this._signature;
  }

  set signature(value: any) {
    this._signature = value;
    this.propagateChange(this.signature);
  }

  public writeValue(value: any): void {
    if (!value) {
      return;
    }
    this._signature = value;
    setTimeout(() => {
      this.signaturePad.fromDataURL(this.signature);
    });
  }

  public registerOnChange(fn: any): void {
    console.log('fn: ', fn);
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {
    // no-op
  }

  public ngAfterViewInit(): void {
    setTimeout(() => { 
      this.signaturePad.set('canvasWidth', this.signatureContainer.nativeElement.clientWidth)
      this.signaturePad.set('backgroundColor', 'rgb(255, 255, 255)');
      this.signaturePad.clear();
    });
  }

  public drawBegin(): void {

  }

  public drawComplete(): void {
    this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);
  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }

  @HostListener('window:resize', ['$event'])
  public setCanvasWidth(e?) {

    this.signaturePad.set('canvasWidth', this.signatureContainer.nativeElement.clientWidth);
    if (this.signature)
      this.signaturePad.fromDataURL(this.signature);
  }

}
