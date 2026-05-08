import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  OnDestroy,
  createComponent,
  inject,
  input,
} from '@angular/core';
import { TooltipByCompComponent } from '../common/components/tooltip/tooltip-by-comp.component';

@Directive({
  selector: '[tooltipByComp]',
  host: {
    '(mouseenter)': 'onMouseEnter($event)',
    '(mousemove)': 'onMouseMove($event)',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class TooltipByCompDirective implements OnDestroy {
  tooltipByComp = input.required<string>();
  tooltipByCompOffset = input(14);

  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly appRef = inject(ApplicationRef);
  private readonly envInjector = inject(EnvironmentInjector);

  private tooltipRef?: ComponentRef<TooltipByCompComponent>;
  private tooltipElement?: HTMLElement;
  private tooltipBubbleElement?: HTMLElement;

  private readonly viewportPadding = 10;

  onMouseEnter(event: MouseEvent): void {
    const message = this.tooltipByComp()?.trim();
    if (!message) {
      return;
    }

    this.createTooltip(message);
    this.updatePosition(event);
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.tooltipRef || !this.tooltipElement) {
      return;
    }

    this.updatePosition(event);
  }

  onMouseLeave(): void {
    this.removeTooltip();
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }

  private createTooltip(message: string): void {
    this.removeTooltip();

    const tooltipRef = createComponent(TooltipByCompComponent, {
      environmentInjector: this.envInjector,
    });

    tooltipRef.setInput('message', message);
    tooltipRef.setInput('visible', false);
    tooltipRef.setInput('left', 0);
    tooltipRef.setInput('top', 0);

    this.appRef.attachView(tooltipRef.hostView);

    const tooltipEl = tooltipRef.location.nativeElement as HTMLElement;
    this.document.body.appendChild(tooltipEl);

    tooltipRef.changeDetectorRef.detectChanges();

    const bubbleElement = tooltipEl.querySelector('.cmp-tooltip');
    if (!(bubbleElement instanceof HTMLElement)) {
      this.appRef.detachView(tooltipRef.hostView);
      tooltipRef.destroy();
      return;
    }

    this.tooltipRef = tooltipRef;
    this.tooltipElement = tooltipEl;
    this.tooltipBubbleElement = bubbleElement;

    requestAnimationFrame(() => {
      if (!this.tooltipRef) {
        return;
      }

      this.tooltipRef.setInput('visible', true);
      this.tooltipRef.changeDetectorRef.detectChanges();
    });
  }

  private updatePosition(event: MouseEvent): void {
    if (!this.tooltipRef || !this.tooltipElement || !this.tooltipBubbleElement) {
      return;
    }

    // Measure the actual tooltip bubble, not the component host wrapper.
    const tooltipRect = this.tooltipBubbleElement.getBoundingClientRect();
    const hostRect = this.hostElement.nativeElement.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const offset = this.tooltipByCompOffset();
    const edgeGap = 8;

    const minLeft = this.viewportPadding;
    const maxLeft = viewportWidth - tooltipRect.width - this.viewportPadding;
    const minTop = this.viewportPadding;
    const maxTop = viewportHeight - tooltipRect.height - this.viewportPadding;

    const centerFromCursor = this.clamp(event.clientX - tooltipRect.width / 2, minLeft, maxLeft);
    const midYFromCursor = this.clamp(event.clientY - tooltipRect.height / 2, minTop, maxTop);

    const positions = [
      {
        left: centerFromCursor,
        top: Math.min(
          event.clientY - tooltipRect.height - offset,
          hostRect.top - tooltipRect.height - edgeGap
        ),
      }, // top
      {
        left: centerFromCursor,
        top: Math.max(event.clientY + offset, hostRect.bottom + edgeGap),
      }, // bottom
      {
        left: Math.max(event.clientX + offset, hostRect.right + edgeGap),
        top: midYFromCursor,
      }, // right
      {
        left: Math.min(event.clientX - tooltipRect.width - offset, hostRect.left - tooltipRect.width - edgeGap),
        top: midYFromCursor,
      }, // left
    ];

    let chosen = {
      left: this.clamp(event.clientX + offset, minLeft, maxLeft),
      top: this.clamp(event.clientY + offset, minTop, maxTop),
    };

    for (const position of positions) {
      const candidate = {
        left: this.clamp(position.left, minLeft, maxLeft),
        top: this.clamp(position.top, minTop, maxTop),
      };
      const tooltipBounds = {
        left: candidate.left,
        right: candidate.left + tooltipRect.width,
        top: candidate.top,
        bottom: candidate.top + tooltipRect.height,
      };

      // Match legacy behavior: reject only overlapping (no extra gap).
      if (!this.rectanglesOverlap(tooltipBounds, hostRect)) {
        chosen = candidate;
        break;
      }
    }

    this.tooltipRef.setInput('left', chosen.left);
    this.tooltipRef.setInput('top', chosen.top);
    this.tooltipRef.changeDetectorRef.detectChanges();
  }

  private rectanglesOverlap(
    first: { left: number; right: number; top: number; bottom: number },
    second: DOMRect
  ): boolean {
    return !(
      first.right <= second.left ||
      first.left >= second.right ||
      first.bottom <= second.top ||
      first.top >= second.bottom
    );
  }

  private clamp(value: number, min: number, max: number): number {
    if (max < min) {
      return min;
    }

    return Math.min(Math.max(value, min), max);
  }

  private removeTooltip(): void {
    const tooltipElement = this.tooltipElement;
    this.tooltipBubbleElement = undefined;
    this.tooltipElement = undefined;

    if (this.tooltipRef) {
      this.appRef.detachView(this.tooltipRef.hostView);
      this.tooltipRef.destroy();
      this.tooltipRef = undefined;
    }

    tooltipElement?.remove();
  }
}

