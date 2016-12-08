// This problem is the same as the previous problem (HTTP COLLECT) in that
//  you need to use http.get(). However, this time you will be provided with
//  three URLs as the first three command-line arguments.
//
//  You must collect the complete content provided to you by each of the URLs
//  and print it to the console (stdout). You don't need to print out the
//  length, just the data as a String; one line per URL. The catch is that you
//  must print them out in the same order as the URLs are provided to you as
//  command-line arguments.
var http = require('http');
var bl = require('bl');
var strings = [];
var count = 0;

function printResults() {
  for (var i = 0; i < strings.length; i++) {
    console.log(strings[i]);
  }
};

function httpget (index) {
  http.get(process.argv[2 + index], function(res) {

    res.pipe(bl(function (err, data) {
      if (err) {
        return console.error(err.stack);
      }
      strings[index] = data.toString();
      count++

      if (count === 3) {
        printResults();
      }
    }));
  });
}

for (var i = 0; i < 3; i++) {
  httpget(i);
}
