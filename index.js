#!/usr/bin/env node

'use strict';

const speaker = require('audio-speaker');
const {Note} = require('octavian');
const generator = require('audio-generator/stream');

const c = new Note('C5');
const d = new Note('D5');
const f = new Note('F5');
const a = new Note('A5');
const g = new Note('G5');

const BPM = 113;
const BREAK = {frequency: 0};

class Melody {
  constructor (bpm, wave = 'sine') {
    this.tick = 0;
    this.sequence = [];
    this.period = 60 / bpm / 4;
    this.wave = wave;
  }

  play (delta) {
    const tick = delta - (this.period * this.tick) >= this.period
      ? this.tick++
      : this.tick;
    if (tick > this.sequence.length - 1) {
      return [null];
    }
    const freq = this.sequence[tick].frequency;
    return [
      Math.sin(Math.PI * 2 * delta * (freq - .5)),
      Math.sin(Math.PI * 2 * delta * (freq + .5))
    ];
  }

  add (duration, ...notes) {
    this.sequence = this.sequence.concat(...notes.map(
      note => new Array(duration).fill(note || BREAK)));
    return this;
  }

  quarter (...notes) {
    return this.add(1, ...notes);
  }

  whole (...notes) {
    return this.add(4, ...notes);
  }

  half (...notes) {
    return this.add(2, ...notes);
  }

  get duration () {
    return (this.sequence.length * this.period ) + 1;
  }
}

const melody = new Melody(BPM).quarter(c, d, f, d, a, null)
  .whole(a, g)
  .half(null)
  .quarter(c, d, f, d, g, null)
  .whole(g, f)
  .half(null);

generator(time => melody.play(time), {
  duration: melody.duration
})
  .pipe(speaker());
