import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  @Output() toggleValueEmitter: EventEmitter<void> = new EventEmitter();
  
  constructor() { }

  public emitToggleEvent(): void {
    this.toggleValueEmitter.emit();
  }

}
