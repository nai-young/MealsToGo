const functions = require('firebase-functions');
const { geocodeRequest } = require('./geocode');
const { placesNearbyRequest } = require('./placesNearby');
const { payRequest } = require('./pay');

const { Client } = require('@googlemaps/google-maps-services-js');
const stripeClient = require('stripe')(functions.config().stripe.key)
const googleClient = new Client({});

exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response, googleClient);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
  placesNearbyRequest(request, response, googleClient);
});

exports.pay = functions.https.onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});
