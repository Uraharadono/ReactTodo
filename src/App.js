import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Todo from "./TodoComponent/Todo";
import Todo2 from "./TodoComponentTwo/Todo";

// We need to import our css files in javascript because that's how webpack works
// These will be extracted to a separate file in production
import './sass/bundles/styles.scss';

class App extends React.Component {

    render() {
        return (
            <Router >
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">Navbar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="todo-list" className="nav-link">Todo list</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="todo-list-2" className="nav-link">Todo list 2</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="/">Action</a>
                                        <a className="dropdown-item" href="/">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="/">Something else here</a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="/">Disabled</a>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>

                    <div>
                        <Route path="/" exact component={Todo} />
                        <Route path="/todo-list" component={Todo} />
                        <Route path="/todo-list-2" component={Todo2} />
                    </div>
                </div>
            </Router >
        );
    }

}

// export default App;
ReactDOM.render(<App />, document.getElementById("app"));