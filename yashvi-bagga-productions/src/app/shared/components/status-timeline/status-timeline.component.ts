import { Component, Input, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApplicationStatus,
  StatusMeta,
  WorkflowTrack,
  flowMeta,
} from '../../models/application-status.model';

/**
 * MODULE 8 — Application Status timeline.
 *
 * Renders the ordered happy-path for a workflow track and highlights the
 * current status. Purely presentational; it reads the canonical FLOWS so the
 * public site and a future ATS stay in sync.
 *
 *   <app-status-timeline track="casting" current="under-review" />
 */
@Component({
  selector: 'app-status-timeline',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      @for (step of steps(); track step.status; let i = $index) {
        <li
          class="relative rounded-2xl border p-4 transition-colors"
          [ngClass]="{
            'border-brand-gold/40 bg-brand-gold/5': isReached(i),
            'border-white/10': isUpcoming(i)
          }"
        >
          <div class="flex items-center gap-3">
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium"
              [ngClass]="{
                'border-brand-gold text-brand-gold': isReached(i),
                'bg-brand-gold/10': isCurrent(i),
                'border-white/15 text-brand-white/40': isUpcoming(i)
              }"
            >
              @if (isDone(i)) { ✓ } @else { {{ i + 1 }} }
            </span>
            <p
              class="font-poppins text-sm"
              [ngClass]="{
                'text-brand-white': isReached(i),
                'text-brand-white/45': isUpcoming(i)
              }"
            >{{ step.label }}</p>
          </div>
          <p class="mt-2 text-brand-white/45 font-poppins text-[11px] leading-5">{{ step.description }}</p>
        </li>
      }
    </ol>
  `,
  styles: [`:host { display: block; }`],
})
export class StatusTimelineComponent {
  private readonly _track = signal<WorkflowTrack>('casting');
  private readonly _current = signal<ApplicationStatus | null>(null);

  @Input() set track(value: WorkflowTrack) { this._track.set(value); }
  @Input() set current(value: ApplicationStatus | null) { this._current.set(value); }

  readonly steps = computed<StatusMeta[]>(() => flowMeta(this._track()));
  readonly activeIndex = computed(() => {
    const cur = this._current();
    if (!cur) {
      return 0;
    }
    const idx = this.steps().findIndex((s) => s.status === cur);
    return idx < 0 ? 0 : idx;
  });

  isReached(i: number): boolean {
    return i <= this.activeIndex();
  }

  isUpcoming(i: number): boolean {
    return i > this.activeIndex();
  }

  isCurrent(i: number): boolean {
    return i === this.activeIndex();
  }

  isDone(i: number): boolean {
    return i < this.activeIndex();
  }
}
