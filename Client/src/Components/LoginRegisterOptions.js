import React from 'react';
// import { Link } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';


// const LoginRegisterOptions = () => {
//     const location = useLocation();
//     const isLogin = location.pathname === '/Login' ? '/Login' : '/Register';
  
const LoginRegisterOptions = ({isLogin}) => {
    //const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const isLogin = searchParams.get('isLogin');
  
  return (
    <div>
      <h2>{isLogin === 'true'? 'Login' : 'Register'}</h2>
      <div>
        <Link to="/StudentRegister">
          <button>Student</button>
        </Link>
        <Link to="/FacultyRegister">
          <button>Faculty</button>
        </Link>
        <Link to="/SecurityRegister">
          <button>Security</button>
        </Link>
        {isLogin ==='false'  && (
          <Link to="/Login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LoginRegisterOptions;
