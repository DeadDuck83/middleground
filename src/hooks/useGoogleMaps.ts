// hooks/useGoogleMaps.ts
import { useCallback } from 'react';

export function useGoogleMaps() {
  const fetchNearbyPlaces = useCallback(
    async (
      latitude: number | google.maps.LatLng | google.maps.LatLngLiteral,
      longitude: number | boolean | null | undefined,
      radius: number,
      preferences: any
    ) => {
      const location = new google.maps.LatLng(latitude, longitude);

      const request = {
        location: location,
        radius: radius * 1609.34, // convert miles to meters
        types: preferences, // array of place types (e.g., ['restaurant', 'cafe'])
      };

      return new Promise<any[]>((resolve, reject) => {
        const service = new google.maps.places.PlacesService(
          document.createElement('div')
        );
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const nearbyPlaces = results.map(result => ({
              lat: result?.geometry?.location?.lat(),
              lng: result?.geometry?.location?.lng(),
            }));
            resolve(nearbyPlaces);
          } else {
            reject(status);
          }
        });
      });
    },
    []
  );

  return {
    fetchNearbyPlaces,
  };
}
``;
