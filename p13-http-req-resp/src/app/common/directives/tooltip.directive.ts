import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, OnDestroy, inject, input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'onMouseEnter($event)',
    '(mousemove)': 'onMouseMove($event)',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class TooltipDirective implements OnDestroy {
  appTooltip = input.required<string>();
  tooltipOffset = input(14);

  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private tooltipElement?: HTMLDivElement;
  private readonly viewportPadding = 10;

  onMouseEnter(event: MouseEvent): void {
    const message = this.appTooltip()?.trim();
    if (!message) {
      return;
    }

    this.createTooltip(message);
    this.updatePosition(event);
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.tooltipElement) {
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

    const tooltip = this.document.createElement('div');
    tooltip.className = 'app-tooltip';
    tooltip.textContent = message;

    this.document.body.appendChild(tooltip);
    this.tooltipElement = tooltip;

    requestAnimationFrame(() => {
      this.tooltipElement?.classList.add('app-tooltip--visible');
    });
  }

  private updatePosition(event: MouseEvent): void {
    if (!this.tooltipElement) {
      return;
    }

    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    const hostRect = this.hostElement.nativeElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const offset = this.tooltipOffset();
    const edgeGap = 8;

    const minLeft = this.viewportPadding;
    const maxLeft = viewportWidth - tooltipRect.width - this.viewportPadding;
    const minTop = this.viewportPadding;
    const maxTop = viewportHeight - tooltipRect.height - this.viewportPadding;

    const centerFromCursor = this.clamp(
      event.clientX - tooltipRect.width / 2,
      minLeft,
      maxLeft
    );
    const midYFromCursor = this.clamp(
      event.clientY - tooltipRect.height / 2,
      minTop,
      maxTop
    );

    const positions = [
      {
        left: centerFromCursor,
        top: Math.min(event.clientY - tooltipRect.height - offset, hostRect.top - tooltipRect.height - edgeGap),
      },
      {
        left: centerFromCursor,
        top: Math.max(event.clientY + offset, hostRect.bottom + edgeGap),
      },
      {
        left: Math.max(event.clientX + offset, hostRect.right + edgeGap),
        top: midYFromCursor,
      },
      {
        left: Math.min(event.clientX - tooltipRect.width - offset, hostRect.left - tooltipRect.width - edgeGap),
        top: midYFromCursor,
      },
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

      if (!this.rectanglesOverlap(tooltipBounds, hostRect)) {
        chosen = candidate;
        break;
      }
    }

    this.tooltipElement.style.left = `${chosen.left}px`;
    this.tooltipElement.style.top = `${chosen.top}px`;
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
    this.tooltipElement?.remove();
    this.tooltipElement = undefined;
  }
}
