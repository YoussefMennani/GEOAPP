import { useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
import AppRoutes from "./router/AppRoutes";
import { Blank } from "./layouts/Blank";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider, useDispatch } from 'react-redux';
import store from './store/store';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from "./keycloak/keycloak";
import { getUserExtrasMe, handleUpdateAuthState, handleUpdateUserState } from "./slices/userSlice";
import PrivateRoute from "./router/PrivateRoute";

function App() {


  const location = useLocation();
  const isAuthPath = location.pathname.includes("auth") || location.pathname.includes("error") || location.pathname.includes("under-maintenance") | location.pathname.includes("blank");

  const eventLogger = (eventType, error) => {
    console.log(`Keycloak event: ${eventType}`, error);
  };

  const tokenLogger = (tokens) => {
    console.log('Keycloak tokens refreshed', tokens);
    store.dispatch(handleUpdateAuthState(tokens));
    console.log("keycloak Object : ", keycloak?.tokenParsed)
    store.dispatch(handleUpdateUserState(keycloak?.tokenParsed));
  };

  const handleOnEvent = async (event, error) => {
    if (event === 'onAuthSuccess') {
      if (keycloak.authenticated) {
        let response = await store.dispatch(getUserExtrasMe(keycloak.token));
        console.log("==============> handleOnEvent ", response)
        // if (response.status === 404) {
        //   const username = keycloak.tokenParsed.preferred_username
        //   const userExtra = { avatar: username }
        //   response = await moviesApi.saveUserExtrasMe(keycloak.token, userExtra)
        //   console.log('UserExtra created for ' + username)
        // }

        // keycloak['avatar'] = response.data.avatar
        console.log(" response KeyCloak :::::::::: ", keycloak)
      }
    }
  }


  return (
    <>

      <ReactKeycloakProvider
        authClient={keycloak}
        // onEvent={eventLogger}
        onEvent={(event, error) => handleOnEvent(event, error)}
        onTokens={tokenLogger}
      >

        {isAuthPath ? (
          <AppRoutes>
            <Blank />
          </AppRoutes>
        ) : (
          <Provider store={store}>
            <PrivateRoute><Layout>
              <AppRoutes />
            </Layout></PrivateRoute>
          </Provider>
        )}

        <ToastContainer closeOnClick />

      </ReactKeycloakProvider>
    </>
  );
}

export default App;
