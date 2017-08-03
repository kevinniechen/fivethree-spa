# FiveThree SPA Frontend
SPA Frontend for my submission for the [MindSumo CapitalOne Restaurant Challenge](https://www.mindsumo.com/contests/restaurant-api)

## Deployment
This is deployed statically on a CDN (Netlify).

[Backend API server](https://github.com/kevchn/fivethree-api)

## Local Deployment
To run this locally, simply install the requirements and then run npm run dev.
> apt-get install nodejs
> npm install --save-dev
> npm run dev

This SPA uses Vue 2.0 and Bulma CSS, and a third-party vue2-google-maps component library. Cross domain access requests are made to the FindThree API backend through XMLHttpRequest, an API container for CORS.


