import './App.css';
import Dashboard from "./views/dashboard";
import ProjectCreateForm from "./views/project/project-create-form";
import ProjectUpdateFrom from "./views/project/project-update-form";
import Navbar from "./components/Navbar";
import "./assets/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
  	<Router>
	    <div className="App">
	    	<Navbar />
	      	<Route exact path="/dashboard" component={Dashboard} />
	      	<Route exact path="/addProject" component={ProjectCreateForm} />
	      	<Route exact path="/updateProject/:projectId" component={ProjectUpdateFrom} />
 	    </div>
    </Router>
  );
}

export default App;