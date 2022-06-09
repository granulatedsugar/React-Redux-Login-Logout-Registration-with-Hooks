import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Signup from "./views/Signup";
import Home from "./views/Home";
import NavigationBar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
    >
      <div className="App">
        <NavigationBar />
        <Home />
        {/* <Signup /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
