import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Todo from "./TodoComponent/Todo";
import Todo2 from "./TodoComponentTwo/Todo";

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <header>
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/todo-list">
                            Todo list
                        </Link>
                        <Link to="/todo-list-2">
                            Todo list 2
                        </Link>
                    </header>
                    {/* <div>
                        <p>React here!</p>
                    </div> */}

                    <Route path="/" exact component={Todo} />
                    <Route path="/todo-list"  component={Todo} />
                    <Route path="/todo-list-2" component={Todo2} />
                </div>
            </Router>
        );
    }

}

// export default App;
ReactDOM.render(<App />, document.getElementById("app"));