import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Signup from "./views/Signup";
import Home from "./views/Home";
import NavigationBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { clearMessage } from "./redux/actions/message";
import { history } from "./helpers/history";
import BoardUser from "./views/BoardUser";
import BoardModerator from "./views/BoardModerator";
import BoardAdmin from "./views/BoardAdmin";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
    >
      <div className="App">
        <NavigationBar />
        <Router history={history}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
