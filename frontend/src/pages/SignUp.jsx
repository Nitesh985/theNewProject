import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";
import { IoHome } from "react-icons/io5";
import axios from "axios";
import useUserContext from "../context/UserContext";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    country: "Nepal",
    address: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const [countries, setCountries] = useState(null);

  const navigate = useNavigate();
  const {setUserData} = useUserContext()

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
      setLoading(true);
      const response = await axios.post("/api/v1/users/sign-up", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response){
        const loginUser = await axios.post("/api/v1/users/sign-in", {
          username: formData.username,
          password: formData.password,
          email:formData.email,
        });
        if (loginUser) {
          setUserData(loginUser?.data?.data)
          navigate("/");
        }
      }
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
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
          className="flex flex-col gap-1"
          encType="multipart/form-data"
        >
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData?.username}
            onChange={handleChange}
            className="form-input-button mt-5"
            required
          />
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleChange}
            className="form-input-button"
            required
          />
          <br />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            minLength={8}
            value={formData?.password}
            onChange={handleChange}
            className="form-input-button "
            required
          />
          <br />
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="form-input-button "
            required
          />
          <br />
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="form-input-button "
            required
          />
          <br />
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-select-button"
          >
            <option disabled className="font-bold">
              Select your country
            </option>

            {countries &&
              countries.map((country, index) => (
                <option key={index}>{country}</option>
              ))}
          </select>
          <br />
          
          <input
            id="avatar"
            type="file"
            className="file-input file-input-bordered file-input-info w-full max-w-xs rounded-2xl"
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
          <button className="form-submit-button mt-3">Submit</button>
          <br />
        </form>
      </div>
    </Loader>
  );
}

export default SignUp;
