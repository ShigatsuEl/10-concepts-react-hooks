import Navigation from "../components/Navigation";
import logo from "../logo.svg";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h4>10 Concepts React Hooks!</h4>
        <Navigation />
      </header>
    </div>
  );
}

export default Home;
