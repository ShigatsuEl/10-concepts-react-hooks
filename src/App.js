import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import First from "./routes/First";
import Second from "./routes/Second";

import "./App.css";

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/first-concept" component={First} />
      <Route path="/second-concept" component={Second} />
    </HashRouter>
  );
}

export default App;
