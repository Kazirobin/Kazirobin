import React, { useEffect, useState } from "react";
import Country from "./Country";
import Visit from "./Visit";

const AllCountry = () => {

  const [country, setCountry] = useState([]);

  const [flags, setFlags] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountry(data));
  }, []);

  const handleStore = (flag) => {
    const newFlag = [...flags, flag];
    setFlags(newFlag);
    console.log(flag)
    console.log(newFlag)
  };

  return (
    <div>
      <div className="flex flex-wrap justify-evenly">
        AllCountry

        {country.map((flag, index) => (
          <Country
            key={index}
            id={index}
            flag={flag}
            handleStore={handleStore}
          />
        ))}
      </div>

      <div className="bg-red-400 absolute left-1 top-1  flex-nowrap justify-evenly ">
        {flags.map((dflag, index) => (
          <Visit key={index} id={index} dflag={dflag} />
        ))}
      </div>
    </div>
  );
};

export default AllCountry;
