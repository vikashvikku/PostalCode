import React from "react";
import "./Detail.css";

const Detail = ({ locationData, country, place, state, clear }) => {
  return (
    <div className="detail">
      {locationData && (
        <div className="detail-content">
          <div className="country">
            {country ? (
              <>
                <span className="">Country: </span> {country}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="state">
            {state ? (
              <>
                <span className="">State: </span> {state}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="place">
            {place ? (
              <>
                <span className="mapped-place">Place: </span> {place}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      <div onClick={clear} className="clear">
        {state ? (
          <>
            <span className="">Clear </span>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Detail;
