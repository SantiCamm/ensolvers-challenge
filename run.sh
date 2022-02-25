#!/bin/sh

cd "./client";
npm install;
cd ..;
cd "./to-dos"
npm install;
npm run dev;