import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnDestroy,
  } from '@angular/core';
  import { Select } from 'primeng/select';
  import { Subscription } from 'rxjs';
  
  let GLOBAL_FILTER_COUNTER = 0;
  
  @Directive({
    selector: '[appSelectFilterId]' // use on <p-select>
  })
  export class SelectFilterIdDirective implements AfterViewInit, OnDestroy {
    /**
     * Optional prefix for generated IDs (default: 'pfilter')
     * Result: pfilter-1, pfilter-2, ...
     */
    @Input() filterIdPrefix = 'pfilter';
  
    /** Optional fixed id (overrides auto) */
    @Input() filterId?: string;
  
    /** Also inject an invisible real <label> for a11y tools */
    @Input() addHiddenLabel = true;
  
    /** Hidden label text */
    @Input() hiddenLabelText = 'Search';
  
    private subs = new Subscription();
  
    constructor(
      private hostEl: ElementRef<HTMLElement>,
      private select: Select
    ) {}
  
    ngAfterViewInit(): void {
      // Patch when panel opens (most reliable moment)
      this.subs.add(this.select.onShow.subscribe(() => this.applyIdToOpenPanel()));
      // Also try once in case it was already open
      queueMicrotask(() => this.applyIdToOpenPanel());
    }
  
    ngOnDestroy(): void {
      this.subs.unsubscribe();
    }
  
    private applyIdToOpenPanel(): void {
      // Find the most recently opened PrimeNG select panel globally.
      // PrimeNG renders an input with class "p-select-filter" inside that panel.
      // We patch ANY visible panel(s) without an id yet to keep it robust.
      const openPanels = Array.from(document.querySelectorAll<HTMLElement>('.p-select-panel'));
      if (!openPanels.length) return;
  
      const tryPatch = (panel: HTMLElement) => {
        // visible panels only
        const style = getComputedStyle(panel);
        const visible = style.display !== 'none' && style.visibility !== 'hidden';
        if (!visible) return;
  
        const filterInput = panel.querySelector<HTMLInputElement>('input.p-select-filter');
        if (!filterInput) return;
  
        // Assign id if missing
        if (!filterInput.id) {
          const id = this.filterId ?? `${this.filterIdPrefix}-${++GLOBAL_FILTER_COUNTER}`;
          filterInput.id = id;
  
          // Optionally add a hidden <label for="..."> after the host block
          if (this.addHiddenLabel) {
            const lbl = document.createElement('label');
            lbl.className = 'visually-hidden';
            lbl.setAttribute('for', id);
            lbl.textContent = this.hiddenLabelText;
            // append next to host for easy DOM proximity
            const parent = this.hostEl.nativeElement.parentElement ?? document.body;
            parent.appendChild(lbl);
          }
        }
      };
  
      // Patch all visible panels (covers multiple p-selects opened independently)
      openPanels.forEach(tryPatch);
  
      // In case the filter input appears a tick later (animation), retry shortly
      setTimeout(() => openPanels.forEach(tryPatch), 0);
    }
  }
  