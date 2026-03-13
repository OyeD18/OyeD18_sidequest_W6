// src/SoundManager.js
// Audio playback (SYSTEM layer).
//
// Responsibilities:
// - Load sound assets during preload() (via loadSound)
// - Play sounds by key (SFX/music)
// - Provide a simple abstraction so gameplay code never touches audio directly
//
// Non-goals:
// - Does NOT subscribe to EventBus directly (Game wires events → play())
// - Does NOT decide when events happen (WORLD logic emits events)
// - Does NOT manage UI
//
// Architectural notes:
// - Game connects EventBus events (leaf:collected, player:damaged, etc.) to SoundManager.play().
// - This keeps audio concerns isolated from gameplay and supports easy swapping/muting.

export class SoundManager {
  constructor() {
    this.sfx = {};
    this._music = null;
  }

  load(name, path) {
    this.sfx[name] = loadSound(path);
  }

  loadMusic(path) {
    this._music = loadSound(path);
  }

  startMusic() {
    if (!this._music || this._music.isPlaying()) return;
    this._music.setVolume(0.4);
    this._music.loop();
  }

  stopMusic() {
    if (this._music?.isPlaying()) this._music.stop();
  }

  play(name) {
    this.sfx[name]?.play();
  }
}
