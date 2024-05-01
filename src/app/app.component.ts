import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import moment from 'moment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  timeInput: string = '';
  selectedRange: string | null = null;
  suggestedRanges: string[] = [];

  defaultRanges = [
    { display: 'Last hour', duration: '1h' },
    { display: 'Last 24 hours', duration: '24h' },
    { display: 'Last 7 days', duration: '7d' },
    { display: 'Last 14 days', duration: '14d' },
  ];

  constructor() {
    this.suggestedRanges = this.defaultRanges.map((range) => range.display);
  }

  updateTimeSuggestions(value: string): void {
    this.timeInput = value;
    let num = parseInt(value, 10);
    let type = value.replace(/[0-9]/g, '');

    this.suggestedRanges = [];
    if (num) {
      const types = type ? [type] : ['minutes', 'hours', 'days', 'weeks'];
      this.suggestedRanges = types
        .map((t) => `Last ${num} ${this.normalizeTimeType(t)}`)
        .filter((range) =>
          this.isValidTimeType(range.replace(/^Last \d+ /, ''))
        );
    } else {
      this.suggestedRanges = this.defaultRanges.map((range) => range.display);
    }
  }

  normalizeTimeType(type: string): string {
    if (type.startsWith('m') || type.startsWith('min')) return 'minutes';
    if (type.startsWith('h') || type.startsWith('hour')) return 'hours';
    if (type.startsWith('d') || type.startsWith('day')) return 'days';
    if (type.startsWith('w') || type.startsWith('week')) return 'weeks';
    return '';
  }

  isValidTimeType(type: string): boolean {
    return ['minutes', 'hours', 'days', 'weeks'].includes(
      this.normalizeTimeType(type)
    );
  }

  selectRange(range: string): void {
    this.selectedRange = range;
  }
}
