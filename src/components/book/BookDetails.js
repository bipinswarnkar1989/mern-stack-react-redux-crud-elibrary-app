// ./src/components/book/BookDetails.js
import React from 'react';
import ReactPDF from 'react-pdf';
import './BookPage.css'
// const BookDetails = ({book, addToCart}) => {
//   return (
//     <div className="media">
//         <div className="media-left">
//           <a href="#">
//             <img className="media-object" src="http://placehold.it/200x280" alt="Placehold" />
//           </a>
//         </div>
//         <div className="media-body">
//           <h4 className="media-heading">{book.title}</h4>
//           <ul>
//             <li><stron>Author: </stron> {book.author}</li>
//             <li><stron>Price: </stron> ${book.price}</li>
//             <li><stron>Year: </stron> {book.year}</li>
//             <br/>
//             <button className="btn btn-primary" onClick={e => addToCart(book)}>Buy</button>
//           </ul>
//         </div>
//       </div>
//   )
// }

class BookDetails extends React.Component {
  // constructor(props) {
  //   super(props);
  // }




render(){
  const { isFetching, favourites, newFavourite, error } = this.props.favouritesData;
  const  b  = this.props.book;
  return (
    <div className="bookDetail">
        <div className="col-md-6">
          <a target="__blank" href={`//localhost:8080/${b.fileName}`}>
            <div className="small_pdf_image">
              <ReactPDF
                      file={`http://localhost:8080/${b.fileName}`}
                      pageIndex={0}
                      loading="Please wait!" scale={2.0} width={300}
                      onDocumentLoad={this.onDocumentLoad}
                      onPageLoad={this.onPageLoad}
                  />
            </div>
          </a>
        </div>
        <div className="col-md-6">
          <h4 className="">{b.title}</h4>
          <ul className="list-group">
            <li><stron>Author: </stron> {b.author}</li>
            <li><stron>Price: </stron> ${b.price}</li>
            <li><stron>Year: </stron> {b.year} </li>
            <br/>
            {isFetching && newFavourite == null &&
              <h3>Adding to favourites...</h3>
            }
            {!isFetching && newFavourite != null && newFavourite.book._id === b._id &&
              <h3>Book Successfully added to favourites</h3>
            }
            {!isFetching && newFavourite == null && error != null &&
              <h3>{error}</h3>
            }
            <button className="btn btn-primary" onClick={this.props.addToFavourite}>AddToFavourite</button>
          </ul>
        </div>
      </div>
  )
}

}

export default BookDetails;
