require('babel-core/register');
require("babel-polyfill");
require('app-module-path').addPath(__dirname);

var filename = process.argv[2];
var test = require('./jobs/' + filename);

test();

/*
 * How to write a new testcase or task job
 *	Step 1: create new .js file in jobs folder, like google.js
 *  Step 2: make sure that your file export a function (read jobs/google.js for example)
 *  Step 3: run testcase by: node run filename (both with and without extenstion are accepted)
 */
