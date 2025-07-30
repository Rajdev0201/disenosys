"use client"

import React, { useState } from "react";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function App() {
  const [country, setCountry] = useState(null);
  const [currentState, setCurrentState] = useState(null);
   const [currentCity, setCurrentCity] = useState(null);

  return (
    <>
    <div>
      <h6>Country</h6>
      <CountrySelect
        containerClassName="form-group"
        inputClassName=""
        onChange={(_country) => setCountry(_country)}
        onTextChange={(_txt) => console.log(_txt)}
        placeHolder="Select Country"
      />
 
      <h6>State</h6>
      <StateSelect
        countryid={country?.id}
        containerClassName="form-group"
        inputClassName=""
        onChange={(_state) => setCurrentState(_state)}
        onTextChange={(_txt) => console.log(_txt)}
        defaultValue={currentState}
        placeHolder="Select State"
      />

       <h6>City</h6>
      <CitySelect
        countryid={country?.id}
        stateid={currentState?.id}
        onChange={(_city) => setCurrentCity(_city)}
        defaultValue={currentCity}
        placeHolder="Select City"
      />
    </div>
 </>
  );
}