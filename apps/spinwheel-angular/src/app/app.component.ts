import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { WheelService } from './wheel.service';
import { Observable } from 'rxjs';
import { WheelState } from './wheel.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private wheelService = inject(WheelService);

  // Expose the state observable to the template
  state$: Observable<WheelState> = this.wheelService.state$;

  getButtonText(state: WheelState): string {
    if (state.isSpinning) return 'Spinning...';
    if (state.spinsUsed >= state.maxSpins) return 'Session Complete';
    return `Spin (${state.maxSpins - state.spinsUsed} left)`;
  }

  spin(): void {
    this.wheelService.spin();
  }

  startNewSession(): void {
    this.wheelService.startNewSession();
  }
}
