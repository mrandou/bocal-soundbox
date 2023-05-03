import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { keyboardMap } from 'utilites/keyMap';
import { Colors } from '../models/card';
import { Sound } from '../models/sound';
@Component({
  selector: 'sound-card',
  templateUrl: './sound-card.component.html',
  styleUrls: ['./sound-card.component.scss']
})
export class SoundCardComponent {
  public colors: string[] = Colors;
  @Input() public sound: Sound;
  @Output() public playingAudio = new EventEmitter<HTMLAudioElement>();
  @Output() public searchByTag = new EventEmitter<string>();
  public isLoaded: boolean = false;

  public audio: HTMLAudioElement;

  constructor() { }

  public getColor(index: number) {
    if (index >= this.colors.length)
      return this.colors[index % this.colors.length]
    return this.colors[index];
  }

  public getKey(): string {
    return (keyboardMap[this.sound.id])
  }

  public playAudio(extendedVersion?: boolean): void {
    const audioUrl = extendedVersion ? this.sound.extended : this.sound.url
    this.audio = new Audio();
    this.audio.src = audioUrl;
    this.audio.load();
    this.audio.addEventListener("canplay", event => {
      this.audio.play()
      this.playingAudio.emit(this.audio);
    });
  }

  public switchPlay(): void {
    if (this.audio.paused)
      this.audio.play()
    else
      this.audio.pause();
  }

  public emitSearchByTag(tag: string): void {
    this.searchByTag.emit(tag);
  }

  public pictureLoaded() {
    this.isLoaded = true;
  }

}
