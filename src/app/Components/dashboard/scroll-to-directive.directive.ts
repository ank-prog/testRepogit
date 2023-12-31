import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Directive({
  selector: '[appScrollToElement]',
})
export class ScrollToDirective {

  @Input() scrollToElement!: string; 

  constructor(private el: ElementRef, private router: Router, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToTargetElement();
      });
  }

  @HostListener('click') onClick() {
    this.scrollToTargetElement();
  }

  private scrollToTargetElement() {
    const targetElementId = this.route.snapshot.queryParams['id'] || this.scrollToElement;
    console.log(targetElementId)
    if (targetElementId) {
      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Element with ID '${targetElementId}' not found.`);
      }
    }
  }
}
