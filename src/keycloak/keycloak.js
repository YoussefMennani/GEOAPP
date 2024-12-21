import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9090',
  realm: 'fleet-management-system',
  clientId: 'fms',
});

export default keycloak;
