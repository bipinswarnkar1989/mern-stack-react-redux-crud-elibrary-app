// ./src/component/App.js
import React from 'react';
import { Link } from 'react-router';

const App = (props) => {
  return (
    <div className="container">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Books</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/books">Books</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      { /* Each Smaller Components */}
      {props.children}
    </div>
  );
}

export default App;
