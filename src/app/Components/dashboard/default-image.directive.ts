import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[errorImage]'
})
export class ErrorImageDirective {
  @Input() errorImage!: string; // Path to the error image

  constructor(private el: ElementRef) {}

  @HostListener('error') onError() {
    this.updateImageSource();
  }

  private updateImageSource() {
    const imageElement: HTMLImageElement = this.el.nativeElement;
    imageElement.src = this.errorImage || 'src/assets/download.png';
    // Optionally, you can also update the alt attribute
    imageElement.alt = 'Error Loading Image';
  }
}
