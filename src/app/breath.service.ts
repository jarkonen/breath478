// src/app/breath.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

export type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'done';

@Injectable({ providedIn: 'root' })
export class BreathService {
  phase$ = new BehaviorSubject<BreathPhase>('done');
  timeLeft$ = new BehaviorSubject<number>(0);
  currentCycle = 0;
  totalCycles = 0;

  private timerSub: any;

  startBreathing(cycles: number) {
    this.totalCycles = cycles;
    this.currentCycle = 0;
    this.startCycle();
  }

  private startCycle() {
    if (this.currentCycle >= this.totalCycles) {
      this.phase$.next('done');
      return;
    }

    this.currentCycle++;
    this.startPhase('inhale', 4, () => {
      this.startPhase('hold', 7, () => {
        this.startPhase('exhale', 8, () => {
          this.startCycle();
        });
      });
    });
  }

  private startPhase(phase: BreathPhase, duration: number, callback: () => void) {
    this.phase$.next(phase);
    this.timeLeft$.next(duration);

    this.timerSub?.unsubscribe();
    this.timerSub = timer(0, 1000).subscribe((sec) => {
      const timeLeft = duration - sec;
      this.timeLeft$.next(timeLeft);
      if (timeLeft <= 0) {
        this.timerSub.unsubscribe();
        callback();
      }
    });
  }
}
