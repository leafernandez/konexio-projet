import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import UsersList from "./components/usersList.component";
import UserAdd from "./components/userAdd.component";
import UserEdit from "./components/userEdit.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={UsersList} />
        <Route path="/register" component={UserAdd} />
        <Route path="/users/:id" component={UserEdit} />
      </div>
    </Router>
  );
}

export default App;