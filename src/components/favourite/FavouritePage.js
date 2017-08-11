import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as favouriteActions from '../../actions/favouriteActions';

import { Alert,Glyphicon,Button,Modal } from 'react-bootstrap';

class FavouritePage extends React.Component{
  constructor(props){
    super(props);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
    this.cofirmDeleteFav = this.cofirmDeleteFav.bind(this);
  }

  componentDidMount(){
    this.props.mappedFetchFavourite();
  }

  showDeleteModal(favToDelete){
    this.props.mappedshowDeleteModal(favToDelete);console.log(favToDelete);
  }

  hideDeleteModal(){
    this.props.mappedhideDeleteModal();
  }

  cofirmDeleteFav(fav){
     this.props.mappedConfirmDeleteFav(this.props.mappedFavToDel.favToDelete);
  }

  render(){
    const deleteFav = this.props.mappedFavToDel;
    return(
      <div>
        <h1>Favourites Page</h1>
        <table className="table">
                  <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Delete</th>
                    <th>View</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.props.mappedItems.map((item,index) => {
                    return (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>{item.book.title}</td>
                        <td>{item.book.price}</td>
                        <td className="textCenter"><Button onClick={() => this.showDeleteModal(item)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button></td>
                        <td><Link to={`book/${item.book._id}`}>View</Link></td>
                      </tr>
                    );
                  })}
                  </tbody>
            </table>

            <Modal
            show={deleteFav.showDeleteModal}
            onHide={this.hideDeleteModal}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Delete Your Favourite</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {deleteFav.favToDelete && !deleteFav.error && !deleteFav.isFetching &&
              <Alert bsStyle="warning">
         Are you sure you want to delete this favourite <strong>{deleteFav.favToDelete.book.title} </strong> ?
       </Alert>
            }
            {deleteFav.favToDelete && deleteFav.error &&
              <Alert bsStyle="warning">
         Failed. <strong>{deleteFav.error} </strong>
       </Alert>
            }

            {deleteFav.favToDelete && !deleteFav.error && deleteFav.isFetching &&
              <Alert bsStyle="success">
          <strong>Deleting.... </strong>
       </Alert>
            }

            {!deleteFav.favToDelete && !deleteFav.error && deleteFav.successMsg &&
              <Alert bsStyle="success">
         Book <strong>{deleteFav.successMsg} </strong>
       </Alert>
            }
            </Modal.Body>
            <Modal.Footer>
             {!deleteFav.successMsg && !deleteFav.isFetching &&
               <div>
               <Button onClick={this.cofirmDeleteFav}>Yes</Button>
               <Button onClick={this.hideDeleteModal}>No</Button>
               </div>
            }
            {deleteFav.successMsg && !deleteFav.isFetching &&
              <Button onClick={this.hideDeleteModal}>Close</Button>
            }
            </Modal.Footer>
          </Modal>

        </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => {
  return {
    mappedItems: state.favourite.favourites,
    mappedFavToDel: state.favourite.deleteFav
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    mappedFetchFavourite: () => dispatch(favouriteActions.fetchFavourite()),
    mappedshowDeleteModal: favToDelete => dispatch(favouriteActions.showDeleteModal(favToDelete)),
    mappedhideDeleteModal: () => dispatch(favouriteActions.hideDeleteModal()),
    mappedConfirmDeleteFav: (favToDelete) => dispatch(favouriteActions.confirmDeleteFavourite(favToDelete))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FavouritePage);
