// components/GoogleMapComponent.tsx
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type Libraries = (
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'places'
  | 'visualization'
)[];

const libraries: Libraries = ['places'];
interface PreferenceOption {
  name: string;
  type: string;
}
interface GoogleMapComponentProps {
  latitude: number;
  longitude: number;
  radius: number;
  // preferences?: PreferenceOption[] | [];
  setDestinationOptions: (destinationOptions: any) => void;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  latitude,
  longitude,
  radius,
  // preferences = [],
  setDestinationOptions,
}) => {
  const [markers, setMarkers] = useState<any[]>([]);
  const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false);

  const fetchNearbyPlaces = async () => {
    const location = new google.maps.LatLng(latitude, longitude);

    // loop through the preferences array and return the type in a string array
    // const preferencesArray = preferences.map(preference => preference.type);

    const request = {
      location: location,
      radius: radius * 1609.34, // convert miles to meters
      types: ['restaurant'], // array of place types (e.g., ['restaurant', 'cafe'])
    };

    return new Promise<any[]>((resolve, reject) => {
      const service = new google.maps.places.PlacesService(
        document.createElement('div')
      );
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const nearbyPlaces = results.map(result => {
            // Get the first photo's URL if available
            const photoUrl =
              result.photos && result.photos.length > 0
                ? result.photos[0].getUrl({ maxWidth: 250, maxHeight: 150 })
                : null;

            return {
              lat: result.geometry?.location?.lat(),
              lng: result.geometry?.location?.lng(),
              name: result.name, // Business name
              address: result.vicinity, // Business address
              photo: photoUrl, // Business photo URL
            };
          });
          setDestinationOptions(nearbyPlaces.slice(0, 5));
          resolve(nearbyPlaces);
        } else {
          reject(status);
        }
      });
    });
  };

  useEffect(() => {
    if (isGoogleApiLoaded) {
      (async () => {
        const nearbyPlaces = await fetchNearbyPlaces();
        setMarkers(nearbyPlaces);
      })();
    }
  }, [isGoogleApiLoaded, latitude, longitude, radius]);

  const mapStyles = {
    height: '100vh',
    width: '100%',
    maxHeight: '500px',
  };

  const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      onLoad={() => setIsGoogleApiLoaded(true)}
      libraries={libraries}
    >
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
