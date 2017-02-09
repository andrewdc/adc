---
title: Can you use both internal and external SVG sprites in icon systems?
date: 2017-02-09
layout: post
path: "/svg-icon-system-wtfs/"
category: "SVG, development, angular2, javascript, gulp, browser, icons, single-page app"
description: "A no polyfill, cross-browser, SVG Icon System...maybe"
mast: "iconmast.png"
---

First of all, [Una Kravets wrote](https://una.im/svg-icons/#💁) an excellent piece about how to set up a coherent SVG icon approach using Gulp. I am greatly indebted to her efforts. You [should start there](https://una.im/svg-icons/#💁), then return here, if you still need to.

Also, consider our specific scenario and browser support requirements. You might be totally good to go with Una's suggestions. Mostly: **Are you routing a single-page app?**

## What we are shooting for

- Replace font based icon system with svgs (done, thx Una!)
- Maintain CSS control over icon presentation (think color, etc)
- Use the [**external** svg use](https://css-tricks.com/svg-use-with-external-reference-take-2/) method
- Support modern browsers,  IE11 and Microsoft Edge
- NOT use [this script](https://github.com/jonathantneal/svg4everybody) polyfill script (explained why below)

## In what scenario?

- Angular 2 / Polymer Apps (part of the: 'why no polyfill.' More below.)
- A routed single-page app

Our main applications are using Angular 2 and it's Router. This appears to be a key challenge to overcome, trying to use inline or external svg sprites.

## External or Inline use?

We support IE11 (which has no support for external SVG), so we initially considered using the inline method. With it, you inject your master svg symbols sprite into the top of your html files, and reference them later by ID.

At first, this worked great. 

I used `gulp-inject` [to stuff](https://github.com/klei/gulp-inject) the optimized and grouped sprite directly after the `<body>`. Here's what the inject task looks like:
```
gulp.src('./src/index.html')
  .pipe(inject(gulp.src('icons-sprite.svg'), {
      starttag: '<!-- inject:icons-sprite.svg -->',
      transform: function (filePath, file) {
          return file.contents.toString('utf8')
      }
  }))
  .pipe(gulp.dest('./dist'));
```

The starttag stuff looks for that placeholder in my index (shown below), and I needed to stringify the svg sprite because gulp-inject doesn't directly support injecting svg files. _(I think...)_ 

```
  <body>
    <div class="icon-source">
    <!-- inject:icons-sprite.svg -->
    <!-- endinject -->
    </div>
    <main-app class="main-app"></main-app>
  </body>
```


Regardless - gulp works in it's typically straightforward conveyor-belt fashion, and just makes the sausage...

![factorio belt](./factoriobelt2.gif)

Later, in our application we could simply do this:

```
<svg class="icon-settings-s">
  <use xlink:href="#settings-s"></use>
</svg>
```
![isitworking](./itsworking.png)

Now way... Is that...is that actually WORKING?!!1!

**...Opens up Microsoft Edge...**

![nope](./explodakin.gif)

Yeah, nope. Also, for whatever reason, Firefox had to be a big hater and just not work either.

Here's what you get in Edge and FireFail with the inline SVG approach:

![wut](./fffail.png)
***Ah, the latest super minimal design. Niceeee...***

## Y U NO WORK?

As far as we could discover, the relative inline SVG problem seemed to revolve around using a routed Angular/SP application. We did discover that if you started at the index of the site _AND_ you also used the svg (literally put the image in the page and reference the sprite on the index), then the icons would persist as you navigated to any other area of the application.

Not helpful.

That's obviously no good because icons need to work everywhere, all the time. If I reload a view, or link directly to an area off the root - Icons should work.

This leads to the next logical question:

## Y U NO script???

Jonathan Neal has written a great backwards compatibility script called [_SVG for Everybody_](https://github.com/jonathantneal/svg4everybody). For most people, this probably will work well.

If I'm not mistaken, `svg4everybody` basically looks for an SVG `<use>` that references an external file, and polyfills that bit with the actual svg code.

However, since we are building routed single-page Angular applications, we would need to call this script any time there was a router change, and potentially even on any DOM update. Also, this script would need to sniff out the user agent, etc. 

This isn't the direction we wanted to go.

Alternatively, we could try and discover how to solve the SPA routing issue. We did investigate this, and found a **mountainous heap of bupkis**. 

At this point, we do not understand exactly why the relative svg's don't work. Our best guess is that MS Edge and Firefox are somehow confused on the location of the source sprite by the router/router-outlet stuff.

Or something.

## What happens if you use both at the same time?

One of the brilliant devs on our team, who somehow just pops in and solves all our problems, suggested, "Can we just use both and stack them?"

![totes blown](./barneyStinsonMindExplosion.gif)

Well, slow down. I don't know actually. To the science. 

Here are the various cases we tested:

`````
//================= Inline only =================
<svg>
  <use xlink:href="#settings-s"></use>
</svg>

//================= External only =================
<svg>
  <use xlink:href="./icons/icons.svg#settings-s"></use>
</svg>

//=============== Both =================
<svg>
  <use xlink:href="#settings-f"></use>
  <use xlink:href="./icons/icons.svg#settings-s"></use>
</svg>

//================= Which one wins and does source order matter?
<svg>
  <use xlink:href="./icons/icons.svg#settings-s"></use>
  <use xlink:href="#settings-f"></use>
</svg>
`````
Note: In the Both test, We used different icons so we could tell which was rendering.

In Chrome, which doesn't appear to care what crap code you write - this happens:
![gearz](./somegears.png)

In other browsers, whichever mode they support (inline or external), would work. Firefox, which only handles external, for instance:

![With Both, in Firefox](./ffwithboth.png)

### Test Observations:

- Both uses works and doesn't break in all our supported browsers (However, is this wise?? Unknown.)
- Source order appears to be totally irrelevant
- In a street fight: Inline SVG content will always win

## Solution: Use Both...I guess?

Like I said, I have a feeling this might not be the right way to use SVG `<use>`. I don't know actually. Also, it still requires bloating your main index file with the inline svg sprite symbols. 

I do know that it works, and it doesn't require a polyfill script running anytime the application DOM state changes. 

The syntax isn't wonderful, but we will probably create a polymer component that streamlines usage. Something like:

```
<icon settings-s></icon>

// which would result in

<svg class="settings-s">
  <use xlink:href="./icons/icons.svg#settings-s"></use>
  <use xlink:href="#settings-s"></use>
</svg>

```

At a later date, we can deprecate the inline approach globally via the component, as browser support changes.

I'd love to hear anyone else's thoughts on this, though. Drop me a line on [Twitter @wtc](http://twitter.com/wtc). 

-Adc
