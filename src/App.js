// ./src/component/App.js
import React from 'react';
import { Link } from 'react-router';
import * as appActions from './actions/appActions';
import { connect } from 'react-redux';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.toggleAddBook = this.toggleAddBook.bind(this);
  }
  toggleAddBook(e){
    e.preventDefault();
     this.props.mappedToggleAddBook();
  }
  render(){
    return (
      // <div className="container">
      //   <nav className="navbar navbar-default">
      //     <div className="container-fluid">
      //       <div className="navbar-header">
      //         <a className="navbar-brand" href="/#">Books</a>
      //       </div>
      //       <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      //         <ul className="nav navbar-nav">
      //           <li><Link to="/">Home</Link></li>
      //           <li><Link to="/about">About</Link></li>
      //           <li><Link to="/books">Books</Link></li>
      //           <li><Link to="/favourites">Favourites</Link></li>
      //           {this.props.location.pathname === '/books' &&
      //           <li><a href="/#" onClick={this.toggleAddBook}>Add Book</a></li>
      //           }
      //         </ul>
      //       </div>
      //     </div>
      //   </nav>
      //   { /* Each Smaller Components */}
      //   {this.props.children}
      // </div>
      <div>
      <Navbar inverse  collapseOnSelect className="customNav">
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">BookLibrary</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/">
           <NavItem eventKey={1}>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/books">
           <NavItem eventKey={2}>Books</NavItem>
        </LinkContainer>
        <LinkContainer to="/favourites">
           <NavItem eventKey={3}>Favourites</NavItem>
        </LinkContainer>

        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
      {this.props.location.pathname === '/books' &&
      <LinkContainer to="/" onClick={this.toggleAddBook}>
         <NavItem eventKey={1}>Add Book</NavItem>
      </LinkContainer>
      }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <div className="container">
  { /* Each Smaller Components */}
   {this.props.children}
  </div>
 </div>
    );
  }
}

//Map state from store to props
const mapStateToProps = (state) => {
  return{
    //you can now say this.props.mappedAppSate
    mappedAppSate: state.appState
  }
}

//Map actions to props
const mapDispatchToProps = (dispatch) => {
  return{
    //you can now say this.props.mappedAppActions
    mappedToggleAddBook: () => dispatch(appActions.toggleAddBook())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
