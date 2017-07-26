// ./src/components/book/BookDetails.js
import React from 'react';

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
  constructor(props) {
    super(props);
  }


render(){
  return (
    <div className="media">
        <div className="media-left">
          <a href="/#">
            <img className="media-object" src="http://placehold.it/200x280" alt="Placehold" />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{this.props.book.title}</h4>
          <ul>
            <li><stron>Author: </stron> {this.props.book.author}</li>
            <li><stron>Price: </stron> ${this.props.book.price}</li>
            <li><stron>Year: </stron> {this.props.book.year} </li>
            <br/>
            <button className="btn btn-primary" onClick={this.props.addToFavourite}>AddToFavourite</button>
          </ul>
        </div>
      </div>
  )
}

}

export default BookDetails;
