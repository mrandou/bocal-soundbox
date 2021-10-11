import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { keyboardMap } from 'utilites/keyMap';

export interface Sound {
  id: number
  title: string;
  pictureUrl: string;
  url: string;
}

@Component({
  selector: 'sound-card',
  templateUrl: './sound-card.component.html',
  styleUrls: ['./sound-card.component.scss']
})
export class SoundCardComponent implements OnInit {
  public colors: string[] = ["dodgerblue", "red", "yellow", "purple", "orange", "cyan", "greenyellow", "pink"];
  @Input() public sound: Sound;
  @Output() public playingAudio = new EventEmitter<HTMLAudioElement>();

  public audio: HTMLAudioElement;

  constructor() { }

  public ngOnInit(): void {
  }

  public getColor(index: number) {
    if (index >= this.colors.length)
      return this.colors[index % this.colors.length]
    return this.colors[index];
  }

  public getKey(): string {
    return (keyboardMap[this.sound.id])
  }

  public playAudio(audioUrl: string): void {
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

}
