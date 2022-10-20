import { Route } from "react-router-dom";
import { HomePage, ChatPage } from "pages";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Route path="/" exact component={HomePage} />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
};

export default App;
