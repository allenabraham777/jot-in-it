import { Route, Redirect, useHistory } from "react-router-dom";
import { HomePage, ChatPage } from "pages";
import { chatState } from "ChatProvider";

import "./App.css";

const HomeRedirect = () => <Redirect to="/" />;

const App = () => {
  const { user } = chatState();
  return (
    <div className="App">
      <Route path="/" exact component={HomePage} />
      <Route path="/chats" component={user ? ChatPage : HomeRedirect} />
    </div>
  );
};

export default App;
