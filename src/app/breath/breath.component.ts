// src/app/breath/breath.component.ts
import { Component, OnInit } from '@angular/core';
import { BreathService } from '../breath.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breath',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breath.component.html',
  styleUrls: ['./breath.component.scss']
})
export class BreathComponent implements OnInit {
  phase = 'done';
  timeLeft = 0;
  ballPosition = 'translateX(0%)';
  transitionDuration = '4s';
  progress = 0; // va de 0 a 100%
  totalSeconds = 0; // tiempo total de un ciclo: 4 + 7 + 8 = 19
  elapsedSeconds = 0;
  ballColor = '#7bc9ff'; // por defecto azul

  constructor(private breathService: BreathService) {}

  ngOnInit() {
    this.totalSeconds = 4 + 7 + 8;

    this.breathService.phase$.subscribe((p) => {
      this.phase = p;
      this.updateBallColor();
    
      if (p === 'done') {
        this.progress = 0; // <- Esto reinicia la pelotita
      }
    });

    this.breathService.timeLeft$.subscribe((t) => {
      const secondsElapsedThisPhase = this.getPhaseDuration(this.phase) - t;
      this.updateProgress(secondsElapsedThisPhase);
      this.timeLeft = t;
    });
  }

  getPhaseDuration(phase: string): number {
    switch (phase) {
      case 'inhale': return 4;
      case 'hold': return 7;
      case 'exhale': return 8;
      default: return 0;
    }
  }

  updateProgress(secondsElapsedThisPhase: number) {
    const baseTime = this.breathService.currentCycle * this.totalSeconds;
  
    let phaseOffset = 0;
    if (this.phase === 'hold') phaseOffset = 4;
    if (this.phase === 'exhale') phaseOffset = 4 + 7;
  
    const absoluteSeconds = baseTime + phaseOffset + secondsElapsedThisPhase;
    const totalDuration = this.breathService.totalCycles * this.totalSeconds;
  
    this.progress = Math.min((absoluteSeconds / totalDuration) * 100, 100);
  }
  
  updateBallColor() {
    switch (this.phase) {
      case 'inhale': this.ballColor = '#7bc9ff'; break; // azul
      case 'hold': this.ballColor = '#7effa0'; break;  // verde
      case 'exhale': this.ballColor = '#ff6e6e'; break; // rojo
      default: this.ballColor = '#999'; break;
    }
  }

  updateBallPosition() {
    switch (this.phase) {
      case 'inhale':
        this.ballPosition = 'translateX(100%)';
        this.transitionDuration = '4s';
        break;
      case 'hold':
        this.ballPosition = 'translateX(100%)';
        this.transitionDuration = '7s';
        break;
      case 'exhale':
        this.ballPosition = 'translateX(0%)';
        this.transitionDuration = '8s';
        break;
      default:
        this.ballPosition = 'translateX(0%)';
        this.transitionDuration = '0s';
    }
  }

  get ballStyle() {
    return {
      transform: `translateX(${this.progress}%)`,
      transition: 'transform 1s linear',
      backgroundColor: this.ballColor
    };
  }
  
  
}
