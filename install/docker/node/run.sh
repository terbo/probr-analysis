#!/bin/sh

sed -i 's/base href="\/"/base href="\/analysis\/"/g' dist/public/index.html
NODE_ENV=production node dist/server/app.js