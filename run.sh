#!/bin/bash

npm install
/usr/bin/nodejs ClientSigningSecret=${ClientSigningSecret} BotToken=${BotToken} node index.js