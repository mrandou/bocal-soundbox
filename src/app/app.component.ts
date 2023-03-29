import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { keyboardMap } from 'utilites/keyMap';
import { Sound } from './models/sound';
import data from './sounds.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bocal-soundbox';
  public sounds: Sound[] = data;
  public displayedSounds: Sound[];
  public audiosList: HTMLAudioElement[] = [];
  public loadingProgression: number = 0;
  public lastGifLoaded: string;
  public searchInput: string;

  constructor() { }

  public pushToSoundList(audio: HTMLAudioElement): void {
    this.audiosList.push(audio);
  }

  public playSound(soundUrl: string): void {
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

  public picturesLoading(picture: string): void {
    this.lastGifLoaded = picture
    this.loadingProgression++;
  }

  public searchByTag(tag: string): void {
    this.searchInput = tag;
    this.searchChange(tag);
  }

  public clearSearch(): void {
    this.searchChange("");
    (document.getElementById("search-input") as HTMLInputElement).value = "";
  }

  public hasSearchValue(): boolean {
    return !!(document.getElementById("search-input") as HTMLInputElement).value;
  }

  private smoothingString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  public searchChange(search: string): void{
    this.displayedSounds = this.sounds.filter((s) => { 
      return this.smoothingString(s.title).includes(this.smoothingString(search)) ||
        s.tags.filter(tag => this.smoothingString(tag).includes(this.smoothingString(search))).length;
    })
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if ((event.target as HTMLInputElement).id === "search-input") return ;
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
