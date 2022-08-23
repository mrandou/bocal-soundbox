import { Component, HostListener } from '@angular/core';
import { keyboardMap } from 'utilites/keyMap';
import { Sound } from './sound-card/sound-card.component';
import data from './sounds.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bocal-soundbox';
  public sounds: Sound[] = data;
  public audiosList: HTMLAudioElement[] = [];
  public isLoading: boolean = true;
  public extendedVersion: boolean = false;

  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  public pushToSoundList(audio: HTMLAudioElement): void {
    this.audiosList.push(audio);
  }

  public playSound(soundUrl: string): void {
    console.log(soundUrl)
    const audio = new Audio();
    audio.src = soundUrl;
    audio.load();
    this.pushToSoundList(audio);
    audio.play();
  }

  public stopSounds(): void {
    this.audiosList.forEach((audio) => audio.pause());
    this.playSound('assets/sounds/ferme-ta-gueule.mp3');
  }

  private getSoundById(id: number): any {
    for (let i = 0; i < data.length; i++) {
      if (id === data[i].id)
        return data[i];
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    for (let i = 0; i <= 61; i++) {
      if (event.key == keyboardMap[i]) {
        const sound = this.getSoundById(i);
        this.playSound(sound.url);
      }
      if (event.key === "SPACE")
        this.stopSounds();
    }
  }
}
