import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Landing from "./components/Landing"
import Home from "./components/Home"
import Detail from "./components/Detail"
import Form from "./components/Form"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route path="/home/:id" component={Detail} />
          <Route path="/create" component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;