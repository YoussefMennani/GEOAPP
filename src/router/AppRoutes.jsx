import { Route, Routes } from "react-router-dom";
// Layout
import { WithoutMenuPage } from "../pages/layouts/WithoutMenuPage";
import { WithoutNavbarPage } from "../pages/layouts/WithoutNavbarPage";
import { ContainerPage } from "../pages/layouts/ContainerPage";
import { FluidPage } from "../pages/layouts/FluidPage";
import { BlankPage } from "../pages/layouts/BlankPage";

import { LoginPage } from "../pages/authentication/LoginPage";
import { RegisterPage } from "../pages/authentication/RegisterPage";
import { ForgotPasswordPage } from "../pages/authentication/ForgotPasswordPage";
import { AccountPage } from "../pages/account/AccountPage";
import { Connections } from "../pages/account/ConnectionsPage";
import { NotificationPage } from "../pages/account/NotificationPage";
import { ErrorPage } from "../pages/misc/ErrorPage";
import { MaintenancePage } from "../pages/misc/MaintenancePage";

import { AccordionPage } from "../pages/user-interface/AccordionPage";
import { AlertPage } from "../pages/user-interface/AlertPage";
import { BadgesPage } from "../pages/user-interface/BadgePage";
import { ButtonPage } from "../pages/user-interface/ButtonPage";
import { CarouselPage } from "../pages/user-interface/CarouselPage";
import { CardsPage } from "../pages/user-interface/CardsPage";
import { CollapsePage } from "../pages/user-interface/CollapsePage";
import { DropdownPage } from "../pages/user-interface/DropdownPage";
import { FooterPage } from "../pages/user-interface/FooterPage";
import { ListGroupPage } from "../pages/user-interface/ListGroupPage";
import { ModalPage } from "../pages/user-interface/ModalPage";
import { NavbarPage } from "../pages/user-interface/NavbarPage";
import { OffcanvasPage } from "../pages/user-interface/OffcanvasPage";
import { PaginationBreadcrumbsPage } from "../pages/user-interface/PaginationBreadcrumbsPage";
import { ProgressPage } from "../pages/user-interface/ProgressPage";
import { SpinnersPage } from "../pages/user-interface/SpinnersPage";
import { TabsPillPage } from "../pages/user-interface/TabsPillPage";
import { ToastPage } from "../pages/user-interface/ToastPage";
import { TooltipPopoverPage } from "../pages/user-interface/TooltipPopoverPage";
import { TypographyPage } from "../pages/user-interface/TypographyPage";

import { BoxiconsPage } from "../pages/icons/BoxiconPage";

import { BasicInputPage } from "../pages/form-element/BasicInputPage";
import { InputGroupPage } from "../pages/form-element/InputGroupPage";
import { HorizontalFormPage } from "../pages/form-layout/HorizontalFormPage";
import { VerticalFormPage } from "../pages/form-layout/VerticalFormPage";
import { TablesPage } from "../pages/TablesPage";
import { DashboardPage } from "../pages/DashboardPage";

import { PerfectScrollbarPage } from "../pages/extended-ui/PerfectScrollbar";
import { TextDividerPage } from "../pages/extended-ui/TextDividerPage";
import Map from "../pages/map/Map";
import Tracker from "../pages/tracker_gps/Tracker";
import Subscriptions from "../pages/subscriptions/Subscriptions";
import Vehicles from "../pages/vehicles/Vehicles";
import Drivers from "../pages/drivers/Drivers";
import Brand from "../pages/tracker_gps/Brand";
import Model from "../pages/tracker_gps/Model";
import MapHistory from "../pages/map-history/MapHistory";
import PrivateRoute from "./PrivateRoute";
import DashboardAnomaly from "../pages/anomaly_detection/DashboardAnomaly";
import UserManager from "../pages/users/UserManager";
import Profils from "../pages/profils/Profils";
import Menu from "../pages/organization/Menu";
import Organization from "../pages/org/Organization";
import OrganizationPage from "../pages/org/OrganizationPage";
  import UnauthorizedPage from "../pages/authentication/UnauthorizedPage";
import ProtectedRoute from "./ProtectedRoute";
import OrgChartOrganization from "../pages/org/OrgChartOrganization";
import {  VehicleRules } from "../pages/vehicles/VehicleRules";
import SubscriptionPlans from "../pages/subscriptions/SubscriptionPlans";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute component={DashboardPage} />} />

      <Route path="/layout/without-menu" element={<WithoutMenuPage />} />
      <Route path="/layout/without-navbar" element={<WithoutNavbarPage />} />
      <Route path="/layout/container" element={<ContainerPage />} />
      <Route path="/layout/fluid" element={<FluidPage />} />
      <Route path="/layout/fluid" element={<FluidPage />} />
      <Route path="/layout/blank" element={<BlankPage />} />

      <Route path="/ui/accordion" element={<AccordionPage />} />
      <Route path="/ui/alerts" element={<AlertPage />} />
      <Route path="/ui/badges" element={<BadgesPage />} />
      <Route path="/ui/buttons" element={<ButtonPage />} />
      <Route path="/ui/cards" element={<CardsPage />} />
      <Route path="/ui/carousel" element={<CarouselPage />} />
      <Route path="/ui/collapse" element={<CollapsePage />} />
      <Route path="/ui/dropdown" element={<DropdownPage />} />
      <Route path="/ui/footer" element={<FooterPage />} />
      <Route path="/ui/list-group" element={<ListGroupPage />} />
      <Route path="/ui/modals" element={<ModalPage />} />
      <Route path="/ui/navbar" element={<NavbarPage />} />
      <Route path="/ui/offcanvas" element={<OffcanvasPage />} />
      <Route
        path="/ui/pagination-breadcrumbs"
        element={<PaginationBreadcrumbsPage />}
      />
      <Route path="/ui/progress" element={<ProgressPage />} />
      <Route path="/ui/spinners" element={<SpinnersPage />} />
      <Route path="/ui/tabs-pills" element={<TabsPillPage />} />
      <Route path="/ui/toasts" element={<ToastPage />} />
      <Route path="/ui/tooltips-popovers" element={<TooltipPopoverPage />} />
      <Route path="/ui/typography" element={<TypographyPage />} />

      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/account/settings" element={<AccountPage />} />
      <Route path="/account/notifications" element={<NotificationPage />} />
      <Route path="/account/connections" element={<Connections />} />

      <Route path="/misc/error" element={<ErrorPage />} />
      <Route path="/misc/under-maintenance" element={<MaintenancePage />} />

      <Route
        path="/extended-ui/perfect-scrollbar"
        element={<PerfectScrollbarPage />}
      />
      <Route path="/extended-ui/text-divider" element={<TextDividerPage />} />

      <Route path="/boxicons" element={<BoxiconsPage />} />

      <Route path="/form/basic-inputs" element={<BasicInputPage />} />
      <Route path="/form/input-groups" element={<InputGroupPage />} />

      <Route
        path="/form-layout/horizontal-form"
        element={<HorizontalFormPage />}
      />
      <Route path="/form-layout/vertical-form" element={<VerticalFormPage />} />

      <Route path="/tables" element={<TablesPage />} />
      
      {/* map */}
      <Route path="/map" element={<ProtectedRoute component={Map} />} />
      <Route path="/map/history/:vehicleLicensePlate" element={<MapHistory />} />

      {/* vehicle */}
      {/* <PrivateRoute><Vehicles /></PrivateRoute> */}
      <Route path="/vehicles/vehicles_manager" element={<Vehicles />} />
      <Route path="/vehicles/rule_manager" element={<VehicleRules />} />
    
      {/* Gps Tracker */}
      <Route path="/gps_tracker/tracker_manager" element={<Tracker />} />
      <Route path="/gps_tracker/brand" element={<Brand />} />
      <Route path="/gps_tracker/model" element={<Model />} />

      {/* Subscription */}
      <Route path="/subscriptions/subscriptions_manager" element={<Subscriptions />} />
      <Route path="/subscriptions/plans_manager" element={<SubscriptionPlans />} />


      {/* Driver */}
      <Route path="/drivers/drivers_manager" element={<Drivers />} />
      
      {/* Anomaly */}
      <Route path="/anomaly/dashboard" element={<DashboardAnomaly />} />

      {/* User Manager */}
      <Route path="/users/user_manager" element={<UserManager />} />

      {/* menu Manager */}
      <Route path="/menu/menu_manager" element={<ProtectedRoute component={Menu} />} />

      {/* profiles Manager */}
      <Route path="/profiles/profile_manager" element={<Profils />} />

      {/* Organization Manager */}
      <Route path="/organization" element={<OrganizationPage />} />
      <Route path="/organization/organization_manager" element={<Organization />} />
      {/* <Route path="/organization/orgChart" element={<OrgChartOrganization />} /> */}

      <Route path="/unauthorized" element={<UnauthorizedPage />} />


    </Routes>

  );
};
export default AppRoutes;
