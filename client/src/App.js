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
          <Route exact path="/home/share" component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
    // <BrowserRouter>
    //   <div className='App'>
    //     <Switch>
    //       <Route exact path="/"><Landing /></Route>
    //       <Route exact path="/home"><Home /></Route>
    //       <Route exact path="/home/:id"><Detail /></Route>
    //       <Route exact path="/home/upload"><Form /></Route>
    //     </Switch>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
