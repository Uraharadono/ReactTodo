import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// routes part
import routes from "./routes";

// We need to import our css files in javascript because that's how webpack works
// These will be extracted to a separate file in production
import './sass/bundles/styles.scss';

class App extends React.Component {

    render() {
        const routeComponents = routes.map(({ path, exact, component }, key) => <Route exact={exact} path={path} component={component} key={key} />);

        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to="/" className="nav-link">
                                        Home
                                 </Link>
                                    {/* <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> */}
                                </li>
                                <li className="nav-item">
                                    {/* <a className="nav-link" href="#">Features</a> */}
                                    <Link to="todo-list" className="nav-link">
                                        Todo list (multi file)
                                 </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="todo-list-2" className="nav-link">
                                        Todo list (single file)
                                 </Link>
                                    {/* <a className="nav-link" href="#">Pricing</a> */}
                                </li>
                                <li className="nav-item">
                                    <Link to="todo-validated" className="nav-link">
                                        Todo list (validated)
                                 </Link>
                                </li>

                            </ul>
                        </div>
                    </nav>
                    <div className="container">
                        {routeComponents}
                    </div>
                </div>
            </Router >
        );
    }

}

// export default App;
ReactDOM.render(<App />, document.getElementById("app"));