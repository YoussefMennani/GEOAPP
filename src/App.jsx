import { useLocation } from "react-router-dom";
import Layout from "./layouts/Layout";
import AppRoutes from "./router/AppRoutes";
import { Blank } from "./layouts/Blank";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  const location = useLocation();
  const isAuthPath = location.pathname.includes("auth") || location.pathname.includes("error") || location.pathname.includes("under-maintenance") | location.pathname.includes("blank");
  return (
    <>
      <Provider store={store}>

      {isAuthPath ? (
        <AppRoutes>
          <Blank />
        </AppRoutes>
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}

      <ToastContainer closeOnClick />
      </Provider>,

    </>
  );
}

export default App;
