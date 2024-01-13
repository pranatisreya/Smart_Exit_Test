import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PreventForwardNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const alertMessage = 'You are trying to leave the page. Your changes may not be saved.';
      alert(alertMessage);
      const message = 'You are not allowed to navigate forward. Please login';
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    const handlePopstate = () => {
      navigate('/');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    //window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      //window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return(
    <div>
    </div>
  );
};

export default PreventForwardNavigation;
