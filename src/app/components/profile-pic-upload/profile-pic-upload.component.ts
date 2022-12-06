import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-profile-pic-upload',
  templateUrl: './profile-pic-upload.component.html',
  styleUrls: ['./profile-pic-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ProfilePicUploadComponent,
      multi: true
    }
  ]
})
export class ProfilePicUploadComponent implements ControlValueAccessor {

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

  writeValue( value: null ) {
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
