// ./src/component/App.js
import React from 'react';
import { Link } from 'react-router';
import * as appActions from './actions/appActions';
import { connect } from 'react-redux';

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
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/#">Books</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/favourites">Favourites</Link></li>
                {this.props.location.pathname === '/books' &&
                <li><a href="/#" onClick={this.toggleAddBook}>Add Book</a></li>
                }
              </ul>
            </div>
          </div>
        </nav>
        { /* Each Smaller Components */}
        {this.props.children}
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
