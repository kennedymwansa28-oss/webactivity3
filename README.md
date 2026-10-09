# Kennedy Mwansa - Student Portfolio (ICT251 Activity 3)

A personal portfolio website built with plain HTML5, CSS and JavaScript for ICT251 Web Technologies at Mulungushi University. It is an improved version of my Activity 2 website, published as a static site on Render.

- **Student:** Kennedy Mwansa (202505451)
- **Live site:** _add your onrender.com link here_

## What is on the site
About Me, My Hobbies, My Learning Plan (with a weekly table), Projects & Skills, My Photos, My Media (video and audio with written summaries) and a Contact form.

## The four JavaScript features (all in `js/script.js`)
1. **Contact form validation and preview (compulsory)** - checks name, email and message on submit. Spaces-only text and badly formatted emails are rejected with messages next to the fields. A valid form shows a local preview (built with `textContent`) saying the data was validated. No message is sent.
2. **Gallery viewer** - Previous and Next buttons change the photo, its alt text, the caption and the "Photo X of 3" counter. Previous is disabled on the first photo and Next on the last.
3. **Theme switch** - the Dark mode / Light mode button switches both themes; the choice is saved in the browser.
4. **Mobile navigation** - on narrow screens a Menu button opens and closes the links (it shows an open/closed state, closes after choosing a link and with the Escape key).

## How to test
1. Open the live site, or open the folder in VS Code and use Live Server on `index.html`.
2. **Form:** press Preview Message with empty fields, then with spaces only, then with an email like `abc@x`. Each should show an error. Fill in valid details and a preview appears.
3. **Gallery:** click Next to the third photo (Next turns off), then Previous back to the first (Previous turns off).
4. **Theme:** click Dark mode, check the text is readable, refresh the page (the theme is remembered), then switch back.
5. **Menu:** make the browser about 375 px wide, click Menu, choose a link, and check the menu closes.
6. **Media:** play and pause the video and the audio clip.

## Project structure
```
index.html
css/styles.css
js/script.js
images/   photo1.jpg, photo2.jpg, photo3.jpg
videos/   intro.mp4, voice.mp3
```

## Sources and credits
- All photos, the video and the audio were made by me.
- Learning resource linked on the site: [MDN Web Docs - Learn web development](https://developer.mozilla.org/en-US/docs/Learn).
- Fonts are the browser's built-in Georgia and Arial; no external libraries are used.
