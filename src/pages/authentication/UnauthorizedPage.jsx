import React from 'react';
import HttpsIcon from '@mui/icons-material/Https';
import keycloak from '../../keycloak/keycloak';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    keycloak.logout(); // Déconnecter l'utilisateur
  };

  return (

    <div style={{ background: "white", width: "50%", margin: "5% auto", padding: "10px", borderRadius: "5px" }}>
      <p style={{ textAlign: "center" }}><HttpsIcon sx={{ fontSize: 100 }} /></p>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page, please conatct your administrator</p>
      {/* <p style={{textAlign:"right"}} >
        <Button variant="contained" color="error" onClick={handleLogout} >
          Log Out
        </Button>
      </p> */}
    </div>
  );
};

export default UnauthorizedPage;