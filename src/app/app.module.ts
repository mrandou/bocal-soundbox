import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SoundCardModule } from './sound-card/sound-card.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SoundCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
