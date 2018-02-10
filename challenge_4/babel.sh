#!/bin/bash
for filename in ./client/src/*.js; do
  node_modules/.bin/babel $filename > ./client/dist/$(basename $filename)
done;
for filename in ./client/src/*.jsx; do
  node_modules/.bin/babel $filename > ./client/dist/$(basename $filename .jsx).js
done;