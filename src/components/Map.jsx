import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import pass from '../pass';

export default function Map({ data }) {
  const mapStyles = {
    height: '50vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: data.lat,
    lng: data.lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: pass.googleMapsAPI,
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
      <Marker position={defaultCenter} />;
    </GoogleMap>
  ) : (
    <></>
  );
}
