/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/useUserLocationStore";

const GeolocationComponent = () => {
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
      {status && <p>{status}</p>}
      {status === "Loading" && (
        <img src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1262.gif" alt="Loading" />
      )}
    </>
  );
};

export default GeolocationComponent;
