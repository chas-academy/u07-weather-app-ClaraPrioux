/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/useUserLocationStore";

const GeolocationComponent = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const setUserPosition = useUserLocationStore(
    (state: any) => state.updateUserLocation
  );

  const [status, setStatus]: any = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser!");
    } else {
      setStatus("Loading");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <h2>Coordinates</h2>
      {status && <p>{status}</p>}
      {userPosition?.latitude && <p>Latitude: {userPosition?.latitude}</p>}
      {userPosition?.longitude && <p>Longitude: {userPosition?.longitude}</p>}
    </>
  );
};

export default GeolocationComponent;
