import { Component } from '@angular/core';
import { Sound } from './sound-card/sound-card.component';
import data from './sounds.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bocal-soundbox';
  public sounds: Sound[] = data;
  public audiosList: HTMLAudioElement[] = [];

  constructor() { }

  public pushToSoundList(audio: HTMLAudioElement): void {
    this.audiosList.push(audio);
  }

  public stopSounds(): void {
    const audio = new Audio();
    this.audiosList.forEach(audio => audio.pause());
    audio.src = "assets/sounds/ferme-ta-gueule.mp3";
    audio.load();
    audio.play();
  }
}
