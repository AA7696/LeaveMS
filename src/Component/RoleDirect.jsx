import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const RoleDirect = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user.role);
  

  useEffect(() => {
    if (!user) return; // optionally handle no user
    if (user.role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/leave', { replace: true });
    }
  }, [user, navigate]);

  return <p>Redirecting...</p>;
};

export default RoleDirect;
