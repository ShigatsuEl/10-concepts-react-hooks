import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import First from "./routes/First";
import Second from "./routes/Second";
import Third from "./routes/Third";
import Fourth from "./routes/Fourth";
import Fifth from "./routes/Fifth";
import Sixth from "./routes/Sixth";

import "./App.css";

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/first-concept" component={First} />
      <Route path="/second-concept" component={Second} />
      <Route path="/third-concept" component={Third} />
      <Route path="/fourth-concept" component={Fourth} />
      <Route path="/fifth-concept" component={Fifth} />
      <Route path="/sixth-concept" component={Sixth} />
    </HashRouter>
  );
}

export default App;
