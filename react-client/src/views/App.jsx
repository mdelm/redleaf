import './App.css';
import Dashboard from "./dashboard";
import AddProject from "./project";
import Navbar from "../components/Navbar";
import "../assets/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
  	<Router>
	    <div className="App">
	    	<Navbar />
	      	<Route exact path="/dashboard" component={Dashboard} />
	      	<Route exact path="/addProject" component={AddProject} />
 	    </div>
    </Router>
  );
}

export default App;