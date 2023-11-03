import React, { useState } from "react";
import "./PostalCode.css";
import Detail from "../Details/Detail";
import { Puff } from "react-loader-spinner";

const PostalCode = () => {
  // Initialising the state
  const [postalCode, setPostalCode] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [country, setCountry] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Loading shows as data is just fetching

      // Fetching Data from the API
      const response = await fetch(
        `https://api.zippopotam.us/in/${postalCode}`
      );
      if (!response.ok) {
        throw new Error("Invalid postal code1."); // Throw error in case of API not responding.
      }

      const data = await response.json();
      setLocationData(data);
      setCountry(data.country); // Extracting country name from the data

      setError(null);
      setLoading(false);

      // Extract place name and state from the data
      const placeName = data.places.map((place, index) => {
        return (
          <div className="mapped-data" key={index}>
            {place["place name"]}
          </div>
        );
      });

      const state = data.places[0].state;
      setPlaceName(placeName);
      setState(state);
    } catch (error) {
      // console.error(error);
      setLocationData(null);
      setPlaceName("");
      setState("");
      setCountry("");
      setError("PIN not found. Please try again."); // in case of Postal Code mismatch error shows.
    }
  };

  // For clearing the detailed information
  const handleClear = () => {
    setState(null);
    setPlaceName(null);
    setCountry(null);
  };

  return (
    <div className="container">
      <div className="header">
        WelCome Guys! You Can Check Your Postal Information Here
      </div>
      <h2 className="enter">Enter Postal Code </h2>
      <form onSubmit={handleSubmit} className="form-input">
        <input
          className="input"
          type="text"
          placeholder="Enter postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          Get Location
        </button>
      </form>
      {loading ? (
        <Puff
          height="80"
          width="80"
          radius={1}
          color="#4fa94d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <Detail
          locationData={locationData}
          country={country}
          place={placeName}
          state={state}
          clear={handleClear}
        />
      )}
      <div className="error">{error}</div>
    </div>
  );
};

export default PostalCode;
