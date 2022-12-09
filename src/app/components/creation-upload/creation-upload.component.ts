import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-creation-upload',
  templateUrl: './creation-upload.component.html',
  styleUrls: ['./creation-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CreationUploadComponent,
      multi: true
    }
  ]
})
export class CreationUploadComponent implements ControlValueAccessor {

  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function;
  private file: File | null = null;

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }


  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  writeValue(value: null) {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  registerOnTouched(fn: Function ) {
  }

}
