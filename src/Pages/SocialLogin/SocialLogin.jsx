import React, { useContext } from 'react'
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Context/ContextProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const {googleSignIn} = useContext(AuthContext)

    const from = location.state?.from?.pathname || '/'

    const handleGoogleSingIn = ()=>{
        googleSignIn()
        .then(result=>{
            const user = result.user;
            const userInfo = {
              name: user.displayName,
              email: user.email,
            };
            fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userInfo),
            })
              .then((response) => response.json())
              .then((result) => console.log(result))
              .catch((error) => console.log("error", error));
            navigate(from,{replace:true})
        })
    }
  return (
    <div>
      {" "}
      <div className="divider">OR</div>
      <div className="w-full text-center">
        <button
          className="btn btn-circle btn-outline "
          onClick={handleGoogleSingIn}
        >
          <FaGoogle />
        </button>
      </div>
    </div>
  );
}

export default SocialLogin