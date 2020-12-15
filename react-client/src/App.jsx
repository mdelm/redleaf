import './App.css';
import Dashboard from "./views/dashboard";
import ProjectForm from "./views/project/project-form";
import Navbar from "./components/Navbar";
import "./assets/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
  	<Router>
	    <div className="App">
	    	<Navbar />
	      	<Route exact path="/dashboard" component={Dashboard} />
	      	<Route exact path="/addProject" component={ProjectForm} />
 	    </div>
    </Router>
  );
}

export default App;