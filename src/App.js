import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./Components/Shared/Navigation/Navigation";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";

const isAuth = false;
const user = {
  activated: false,
};

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        {
          // Routes inside this will be for diff pages and we will keep naviagtion component out of this
          // as then it will be shared among all the pages
          // Below are 1) The home page....2) The Registration page
        }

        {
          // we will be using protected routes here by creating a guestroute and assigning some checks to it,so that hence forth, the components that we put in it will go thru these checks always to ensure those components(pages) are always protected
        }

        <Route element={<GuestRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>
        <Route element={<SemiProtectedRoute />}>
          <Route path="/activate" element={<Activate />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/rooms" element={<Rooms />} />
        </Route>
      </Routes>
    </Router>
  );
}

const GuestRoute = () => {
  return isAuth ? <Navigate to="/rooms" /> : <Outlet />;
};

const SemiProtectedRoute = () => {
  // if user is not logged in, navigate them to home but is user is logged in but not activated show them Outlet(children) and if user is both logged in and activated show them rooms
  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !user.activated ? (
    <Outlet /> //Children of semiprotected area
  ) : (
    <Navigate to="/rooms" />
  );
};

const ProtectedRoute = () => {
  // if user is logged in(only) then our guest route redirects him to rooms which is not desirable as then there is no check that the user has put up his username and profile picture, and if the user has not put up that he should be navigated to "/activate" insted of "/rooms" to fill up the details, so we apply one more check for protectedroute and we check the very same condition in it that is mentioned above
  return !isAuth ? (
    <Navigate to="/" />
  ) : isAuth && !user.activated ? (
    <Navigate to="/activate" />
  ) : (
    <Outlet /> //Children of protected area
  );
};

export default App;
