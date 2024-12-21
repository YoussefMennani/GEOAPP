import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

function PrivateRoute({ children }) {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    // Attendre que Keycloak soit prêt
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    // Redirige vers la page de connexion Keycloak
    keycloak.login();
    return null; // Retourne null pendant la redirection
  }

  // Si l'utilisateur est authentifié, affichez les enfants
  return children;
}

export default PrivateRoute;
