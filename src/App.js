import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import First from "./routes/First";

import "./App.css";

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/first-concept" component={First} />
    </HashRouter>
  );
}

export default App;
