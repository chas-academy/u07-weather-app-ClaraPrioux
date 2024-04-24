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
      {status === "Loading" && (
        <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700" alt="Loading" className="w-1/4" />
      )}
    </>
  );
};

export default GeolocationComponent;
