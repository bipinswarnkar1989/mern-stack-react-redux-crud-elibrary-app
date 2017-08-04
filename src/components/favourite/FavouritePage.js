import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as bookActions from '../../actions/bookActions';

class FavouritePage extends React.Component{

  componentDidMount(){
    this.props.mappedFetchFavourite();
  }
  render(){
    return(
      <div>
        <h1>Favourites Page</h1>
        <table className="table">
                  <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.props.mappedItems.map((item,index) => {
                    return (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>{item.book.title}</td>
                        <td>{item.book.price}</td>
                        <td><Link to={`book/${item.book._id}`}>View</Link></td>
                      </tr>
                    );
                  })}
                  </tbody>
            </table>
        </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => {
  return {
    mappedItems: state.favourite.favourites
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    mappedFetchFavourite: () => dispatch(bookActions.fetchFavourite())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FavouritePage);
