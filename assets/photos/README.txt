ADD KHUSHI'S PHOTOS HERE
========================

Save 5 photos in this folder named exactly:
  1.jpg   2.jpg   3.jpg   4.jpg   5.jpg
(3.jpg is the big centre "birthday girl" photo — use her best one.)

Then open styles.css, find the block that starts with:
  /* gradient placeholders — replace .ph--n ... */

...and change each line to point at the photo, e.g.:

  .ph--1 { background: url(assets/photos/1.jpg) center/cover; }
  .ph--2 { background: url(assets/photos/2.jpg) center/cover; }
  .ph--3 { background: url(assets/photos/3.jpg) center/cover; }
  .ph--4 { background: url(assets/photos/4.jpg) center/cover; }
  .ph--5 { background: url(assets/photos/5.jpg) center/cover; }

Also remove (or comment out) the `.ph::after { content: "📷 add photo"; }`
rule so the label disappears once real photos are in.

Square-ish photos look best. That's it — refresh the page. 🎉


OPTIONAL — BACKGROUND MUSIC
===========================
Drop any song here as:  assets/song.mp3
Then tap the 🎵 button (bottom-right) on the site to play it.

OPTIONAL — HER AGE / CANDLES
============================
Open script.js (top of file) and set:  const AGE = 21;
That lights that many candles in the "How many candles?" section.
Leave it as null for a generic cheerful reveal.
