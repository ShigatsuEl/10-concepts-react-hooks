import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import First from "./routes/First";
import Second from "./routes/Second";
import Third from "./routes/Third";
import Fourth from "./routes/Fourth";
import Fifth from "./routes/Fifth";
import Sixth from "./routes/Sixth";
import Seventh from "./routes/Seventh";
import Eighth from "./routes/Eighth";
import Nineth from "./routes/Nineth";
import Tenth from "./routes/Tenth";

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
      <Route path="/seventh-concept" component={Seventh} />
      <Route path="/eighth-concept" component={Eighth} />
      <Route path="/nineth-concept" component={Nineth} />
      <Route path="/tenth-concept" component={Tenth} />
    </HashRouter>
  );
}

export default App;
