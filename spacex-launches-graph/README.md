# Starter-Template
Starter Template for my projects. Currently uses Gulp

To start:
Download the project or
```javascript
git clone
```

Make sure you have node and gulp installed
```javascript
node -v
gulp -v
```
If not run:
```javascript
npm install node
npm install gulp
```
Install dependencies
```javascript
npm install
gulp
```

Deploy to Surge (config gulpfile.js first)
```javascript
gulp deploy
```

Current Gulp Build:

CSS: 
- Drop your sass files on the css folder
- Will output everything to styles.min.css
* Sass -> CSS
* Sourcemaps
* Autoprefixer
* Concat and CSSNano

Javascript:
- Drop your js files on the js original folder
- Will output everything to main.min.js
* ES6 -> ES5 (using Babel)
* Uglify
* Concat
* JSHint

Images
- Drop images on the original folder
- Will output to the minify folder
* Imagemin for optimization

General
- Errors are handled with plumber
- BrowserSync is running and waiting for saved changes to reload
- Size of tasks will be shown on the terminal 



