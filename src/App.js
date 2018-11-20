import React from "react";
import ReactDOM from "react-dom";
// const App = () => {
//     return (
//         <div>
//             <p>React here!</p>
//         </div>
//     );
// };

class App extends React.Component {

    render() {
        return (
            <div>
                <p>React here!</p>
            </div>
        );
    }

}

export default App;
ReactDOM.render(<App />, document.getElementById("app"));