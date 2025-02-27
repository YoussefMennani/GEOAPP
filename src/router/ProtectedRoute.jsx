import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { keycloak, initialized } = useKeycloak();

  // Function to check if the user has access to the route
  const hasAccess = (menu, path) => {
    if (!menu || !menu.data) {
      return false; // If menu or menu.data is undefined, deny access
    }

    for (const section of menu.data) {
      for (const item of section.items) {
        if (item.link === path) {
          return item.available && item.operation.read;
        }
        if (item.submenu) {
          for (const subItem of item.submenu) {
            if (subItem.link === path) {
              return subItem.available && subItem.operation.read;
            }
          }
        }
      }
    }
    return false;
  };

  // Function to find the first authorized page
  const findFirstAuthorizedPage = (menu) => {
    if (!menu || !menu.data) {
      return null;
    }

    for (const section of menu.data) {
      for (const item of section.items) {
        if (item.available && item.operation.read) {
          return item.link;
        }
        if (item.submenu) {
          for (const subItem of item.submenu) {
            if (subItem.available && subItem.operation.read) {
              return subItem.link;
            }
          }
        }
      }
    }
    return null;
  };

  // Check if user, profile, or menu is undefined
  if (!user || !user.profile || !user.profile.menu) {
    // navigate('/auth/login'); // Redirect to login if user, profile, or menu is not defined
    navigate('/unauthorized')
    return null;
  }

  const currentPath = location.pathname; // Get the current path from the location object
  const isAuthorized = hasAccess(user.profile.menu, currentPath);

  if (!isAuthorized && !keycloak.tokenParsed.realm_access.roles.some((val) => val === "SUPER_ADMIN")) {
    const firstAuthorizedPage = findFirstAuthorizedPage(user.profile.menu);
    if (firstAuthorizedPage) {
      navigate(firstAuthorizedPage); // Redirect to the first authorized page
    } else {
      navigate('/unauthorized'); // Fallback to unauthorized page if no authorized page is found
    }
    return null;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;