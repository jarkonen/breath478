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

  constructor(private breathService: BreathService) {}

  ngOnInit() {
    this.breathService.phase$.subscribe((p) => {
      this.phase = p;
      this.updateBallPosition();
    });

    this.breathService.timeLeft$.subscribe((t) => {
      this.timeLeft = t;
    });
  }

  updateBallPosition() {
    switch (this.phase) {
      case 'inhale':
        this.ballPosition = 'translateX(100%)';
        break;
      case 'hold':
        this.ballPosition = 'translateX(100%)';
        break;
      case 'exhale':
        this.ballPosition = 'translateX(0%)';
        break;
      default:
        this.ballPosition = 'translateX(0%)';
    }
  }
}
