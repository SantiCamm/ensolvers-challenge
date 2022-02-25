import "./App.css";
import { Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";
// import Login from "./pages/Login";
// import PrivateRoute from "./routes/PrivateRoute";
// import PrivateLogin from "./routes/PrivateLogin";
import NavBar from "./components/Navbar";
import NotFound from "./components/NotFound";

function App() {
  // const location = useLocation();

  // const defaultPrivateRouteProps = {
  //   authenticationPath: "/login"
  // };

  // const defaultPrivateRoutePropsLogin = {
  //   defaultPath: "/todos"
  // };

  return (
    <>
      {/* {location.pathname !== "/login" && <NavBar />} */}
      <NavBar />
      <div className="app">
        <Routes>
          <Route path="/todos" element={<Todos />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route
          path="/"
          element={
            <PrivateRoute {...defaultPrivateRouteProps} outlet={<Todos />} />
          }
        /> */}
          {/* <Route
          path="/login"
          element={
            <PrivateLogin
              {...defaultPrivateRoutePropsLogin}
              outlet={<Login />}
            />
          }
        /> */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
