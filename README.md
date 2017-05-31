# never-gonna-give-you-up

> Because you need to play Rick Astley from your terminal

**[[[ IN STEREO WHERE AVAILABLE ]]]**

## Install

*Requires Node.js v4 or newer*

```bash
$ npm install -g never-gonna-give-you-up
```

## Usage

```bash
# turn up your speakers real loud
$ rickroll
# listen to the sweet, sweet tunes
```

## Notes

- The sound is synthesized into PCM audio then piped (via Node.js stream) to your speaker, using the below packages.  Octavian makes working with actual notes pretty easy.

  - [audio-generator](https://npm.im/audio-generator)
  - [audio-speaker](https://npm.im/audio-speaker)
  - [octavian](https://npm.im/octavian)

- Would like to know the best way to create polyphonic sounds.  Unsure if I can use something written for Web Audio API via polyfill, or if I should create several streams, or what.

- Dumping too much console output while the song is playing can cause errors in mpg123.  I am not sure why.

- Had to fudge the song duration, because it wanted to cut too early.  Again, not sure why.

## License

Copyright 2017 [Christopher Hiller](https://boneskull.com).  Licensed MIT.

