const pass = {
  paypalPaymentClientID: String(process.env.PAYPAL_PAYMENT_CLIENT_ID),
  googleMapsAPI: String(process.env.GOOGLE_MAPS_API),
  geocodingMaps: String(process.env.GEOCODING_MAPS),
  firebaseToken: String(process.env.FIREBASE_TOKEN),
};

export default pass;
