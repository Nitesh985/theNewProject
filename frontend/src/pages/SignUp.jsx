import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../utils/Loader";

import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    country: "Nepal",
    address: "",
    contact: ""
  });


  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const [countries, setCountries] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "file" ? files[0] : value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      setResponse("");
      setLoading(true)
      const response = await axios.post("/api/v1/users/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setResponse(response.data);
      setLoading(false)
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
      setLoading(false)
    }
  };

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data.map((country) => country.name.common));
      })
      .then(() => {
        setCountries((prevData) => prevData.sort());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

    return (
        <Loader loading={loading}>
          <div className="flex justify-center font-bold text-3xl">Sign Up</div>
          <div className="flex justify-center">
            {error && <p className="text-red-600">{error}</p>}
            {response && <p className="text-green-600">{response.message}</p>}
          </div>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2"
              encType="multipart/form-data"
            >
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData?.username}
                onChange={handleChange}
                className="w-[300px] lg:w-[500px] indent-1 input input-bordered input-primary"
              />
              <br />
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData?.email}
                onChange={handleChange}
                className="w-[300px] lg:w-[500px] indent-1 input input-bordered input-primary"
              />
              <br />
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData?.password}
                onChange={handleChange}
                className="w-[300px] lg:w-[500px] indent-1 input input-bordered input-primary "
              />
              <br />
              <label htmlFor="contact">Contact: </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact"
                className="w-[300px] lg:w-[500px] indent-1 input input-bordered input-primary "
              />
              <br />
              <label htmlFor="address">Address: </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-[300px] lg:w-[500px] indent-1 input input-bordered input-primary "
              />
              <br />
              <label htmlFor="country">Country: </label>
              <select
                id="country"
                name="country"
                value= {formData.country}
                onChange={handleChange}
                className="select select-primary w-[300px] lg:w-[500px] indent-1 h-14 text-[15px]"
              >
                  <option disabled className="font-bold">Select your country</option>
                  
                  {countries &&
                    countries.map((country, index) => (
                      <option key={index}>{country}</option>
                    ))}
              </select>
              <br />
              <label htmlFor="avatar">Choose your profile picture: </label>
              <input
                id="avatar"
                type="file"
                className="file-input file-input-bordered file-input-info w-full max-w-xs"
                name="avatar"
                onChange={handleChange}
              />
              <h1 className="mt-2">
                <Link
                  to="/sign-in"
                  className="link link-success transition-all duration-200 ease-linear"
                >
                  Already have an account?
                </Link>
              </h1>
              <button className="btn mt-3">Submit</button>
            </form>
        
          </div>
          <label className="swap swap-flip text-9xl">
            <input type="checkbox" />
            <div className="swap-on">😈</div>
            <div className="swap-off">😇</div>
          </label>
          <label className="swap swap-rotate">
            <input type="checkbox" />
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <br />


        </Loader>
    );
}

export default SignUp;
