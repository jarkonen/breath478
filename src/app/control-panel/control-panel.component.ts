// src/app/control-panel/control-panel.component.ts
import { Component } from '@angular/core';
import { BreathService } from '../breath.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss'
})
export class ControlPanelComponent {
  cycles = 3;

  constructor(private breathService: BreathService) {}

  start() {
    this.breathService.startBreathing(this.cycles);
  }
}
