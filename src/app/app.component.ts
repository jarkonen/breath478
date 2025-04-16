import { Component } from '@angular/core';
import { BreathComponent } from './breath/breath.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ControlPanelComponent, BreathComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
