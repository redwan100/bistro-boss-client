import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Context/ContextProvider';
import SocialLogin from '../SocialLogin/SocialLogin';



const SignUp = () => {
    const [error, setError] = useState('')
    const {createUser, updateUserProfile, logOut} = useContext(AuthContext)
    const navigate = useNavigate()
   
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

    const onSubmit  = (data) =>{
        console.log(data);
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;

             updateUserProfile(data.name, data.photoUrl).then(()=>{
              const userInfo={
                name: data.name,
                email: data.email
              }
              fetch("http://localhost:5000/users", {
                method:"POST",
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(userInfo)
              })
                .then((response) => response.json())
                .then((result) => console.log(result))
                .catch((error) => console.log("error", error));
             })
             .catch(err => setError(err))

             logOut()
             .then(()=>{})

             navigate('/login')
        })
        .catch(err => setError(err))

       
    }
  return (

      <div className="card shadow-2xl  bg-base-100 max-w-md md-w-xl mx-auto mt-12">
        <h1 className="text-5xl font-bold text-center py-4">Sign Up!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Enter Name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              <small className="text-red-500">
                {errors.name && <span>Please type your name </span>}
              </small>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                name="email"
                {...register("email", { required: true })}
              />
              <small className="text-red-500">
                {errors.email && <span>Please type your email</span>}
              </small>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 10,
                })}
              />
              <small className="text-red-500">
                {errors.password && (
                  <span>Please type your password at least 6 character</span>
                )}
              </small>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            {error && <p className="text-error font-medium">{error}</p>}
          </div>
          <div>
            <SocialLogin />
          </div>
          <p className="p-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
  );
}

export default SignUp