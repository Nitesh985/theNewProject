import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../utils/Loader";
import useUserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";


function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setUserData } = useUserContext();
  const navigate = useNavigate();

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userOrEmail, setUserOrEmail] = useState("email");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      setError("");
      setResponse("");
      setLoading(true);

      const response = await axios.post("api/v1/users/sign-in", formData);
      setResponse(response.data?.message);
      const { data } = response.data;
      if (data) {
        setLoading(false);
        setUserData(data);
        navigate("/");
      }
    } catch (error) {
      setError(error?.response?.data?.message || error?.message);
      setLoading(false);
    }
  };

  return (
    <Loader loading={loading}>
      <div className="flex justify-center font-bold text-3xl">Sign In</div>
      <div className="flex justify-center">
        {response && <p className="text-green-500">{response}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor={userOrEmail}>
            <select
              className="select text-[15px]"
              name="userOrEmail"
              onChange={(event) => {
                setUserOrEmail(event.target.value);
              }}
            >
              <option value="email">Email</option>
              <option value="username">Username</option>
            </select>
          </label>
          <input
            type={userOrEmail === "email" ? userOrEmail : "text"}
            id={userOrEmail}
            name={userOrEmail}
            placeholder={`Enter your ${userOrEmail}`}
            value={userOrEmail === "email" ? formData.email : formData.username}
            onChange={handleChange}
            className="w-[300px] lg:w-[500px] indent-1 input input-bordered input-primary form-input-button "
            required
          />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            minLength={8}
            value={formData.password}
            onChange={handleChange}
            className="w-[300px] lg:w-[500px] indent-1 input input-bordered input-primary form-input-button "
            required
          />
          <h1 className="mt-2">
            <Link
              to="/sign-up"
              className="link link-info transition-all duration-200 ease-linear"
            >
              Don't have an account?
            </Link>
          </h1>
          <button className="form-submit-button mt-3">Submit</button>
        </form>
      </div>
    </Loader>
  );
}

export default SignIn;
