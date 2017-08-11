// ./src/component/App.js
import React from 'react';
import { Link } from 'react-router';
import * as appActions from './actions/appActions';
import { connect } from 'react-redux';
import { Navbar,Nav,NavItem,MenuItem } from 'react-bootstrap';
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
