import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SpinResult {
  emoji: string;
  name: string;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface WheelState {
  wheelItems: SpinResult[];
  currentRotation: number;
  isSpinning: boolean;
  spinsUsed: number;
  maxSpins: number;
  results: SpinResult[];
  lastResult: SpinResult | null;
  winningCombination: SpinResult[];
  gameStatus: GameStatus;
}

@Injectable({
  providedIn: 'root'
})
export class WheelService {
  private readonly initialState: WheelState = {
    wheelItems: [
      { emoji: '🎉', name: 'Party' },
      { emoji: '🚀', name: 'Rocket' },
      { emoji: '🎨', name: 'Art' },
      { emoji: '🌟', name: 'Star' },
      { emoji: '🎵', name: 'Music' },
      { emoji: '🍕', name: 'Pizza' },
      { emoji: '🦄', name: 'Unicorn' },
      { emoji: '💎', name: 'Diamond' }
    ],
    currentRotation: 0,
    isSpinning: false,
    spinsUsed: 0,
    maxSpins: 5,
    results: [],
    lastResult: null,
    winningCombination: [],
    gameStatus: 'playing' as GameStatus
  };

  private readonly state = new BehaviorSubject<WheelState>(this.initialState);

  constructor() {
    this.startNewSession(); // Initial setup
  }

  // Public observables for the component to subscribe to
  public readonly wheelItems$ = this.state.asObservable();
  public readonly state$ = this.state.asObservable();

  spin(): void {
    const currentState = this.state.getValue();
    if (currentState.isSpinning || currentState.spinsUsed >= currentState.maxSpins) {
      return;
    }

    this.state.next({ ...currentState, isSpinning: true });

    const baseRotation = 1440 + Math.random() * 1440;
    const finalPosition = Math.random() * 360;
    const newRotation = currentState.currentRotation + baseRotation + finalPosition;

    const segmentAngle = 360 / currentState.wheelItems.length;
    const normalizedRotation = (360 - (newRotation % 360)) % 360;
    const segmentIndex = Math.floor(normalizedRotation / segmentAngle);
    const resultItem = currentState.wheelItems[segmentIndex];

    this.state.next({ ...this.state.getValue(), currentRotation: newRotation });

    setTimeout(() => {
      const updatedResults = [...this.state.getValue().results, resultItem];
      const newSpinsUsed = this.state.getValue().spinsUsed + 1;
      let newGameStatus: GameStatus = 'playing';

      if (newSpinsUsed >= this.state.getValue().maxSpins) {
        newGameStatus = this._checkWinCondition(updatedResults) ? 'won' : 'lost';
      }

      this.state.next({
        ...this.state.getValue(),
        isSpinning: false,
        spinsUsed: newSpinsUsed,
        lastResult: resultItem,
        results: updatedResults,
        gameStatus: newGameStatus
      });
    }, 3000);
  }

  startNewSession(): void {
    const newWinningCombination = this._generateWinningCombination();
    this.state.next({
      ...this.initialState,
      winningCombination: newWinningCombination,
      // Keep the same wheel items, but reset everything else
      wheelItems: this.state.getValue().wheelItems,
    });
  }

  private _generateWinningCombination(): SpinResult[] {
    const items = this.initialState.wheelItems;
    return Array.from({ length: 5 }, () => items[Math.floor(Math.random() * items.length)]);
  }

  private _checkWinCondition(results: SpinResult[]): boolean {
    const winning = this.state.getValue().winningCombination;
    if (results.length !== winning.length) return false;
    // Simple check: could be more complex (e.g., order matters)
    return results.every((res, i) => res.emoji === winning[i].emoji);
  }
}
