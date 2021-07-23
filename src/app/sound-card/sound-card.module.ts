import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundCardComponent } from './sound-card.component';

@NgModule({
  declarations: [ SoundCardComponent ],
  imports: [
    CommonModule,
  ],
  exports: [ SoundCardComponent ]
})
export class SoundCardModule { }
