#!/bin/bash

rm -rf dist && mkdir dist
npx babel src --out-dir dist --ignore node_modules
