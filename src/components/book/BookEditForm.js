// ./src/components/book/BookForm.js
import React from 'react';
import { FormGroup,ControlLabel,FormControl,Button,Glyphicon } from 'react-bootstrap';

const BookEditForm = (props) => {
  return (
    <form
    className="form form-horizontal" id="bookEditForm" onChange={props.handleChange} onSubmit={props.submitEditBook}
    >

    <div className="row">
    <div className="col-md-12">
    <FormGroup>
          <ControlLabel>Title: </ControlLabel>
          <FormControl
            type="hidden"
            name="BookId" defaultValue={props.bookData._id}
             />
             <FormControl
               type="hidden"
               name="filePath" defaultValue={props.bookData.filePath}
                />
            <FormControl
              type="text" placeholder="Enter title"
              name="title" defaultValue={props.bookData.title}
               />
        </FormGroup>
        </div>
      <div className="col-md-6">
        <FormGroup >
        <ControlLabel>PDF File: </ControlLabel>
        <center><a target="__blank" href={`//localhost:8080/${props.bookData.fileName}`}><Button bsStyle="warning" bsSize="xsmall"><Glyphicon glyph="file" />View Pdf</Button></a></center>
        <input className="form-control"
            type="file"
            name="file"
           id="editfile" accept=".pdf,.PDF" onChange={props.handleUploadFile}/>
      </FormGroup>
    </div>
    <div className="col-md-6">
        <FormGroup>
          <ControlLabel>Author: </ControlLabel>
            <FormControl
              type="text"
              name="author"
               placeholder="Enter author" defaultValue={props.bookData.author}/>
        </FormGroup>
     </div>
     <div className="col-md-6">
        <FormGroup>
          <ControlLabel>Price: </ControlLabel>
            <FormControl
              type="number"
              name="price"
              placeholder="Enter price" defaultValue={props.bookData.price} />
          </FormGroup>
       </div>
       <div className="col-md-6">
        <FormGroup>
          <ControlLabel>Publication Year: </ControlLabel>
            <FormControl
              type="text"
              name="year"
              placeholder="Enter publication year" defaultValue={props.bookData.year} />
          </FormGroup>
        </div>
    </div>

        <FormGroup>
            <Button type="submit" bsStyle="success" bsSize="large" block>Update</Button>
        </FormGroup>
    </form>
  );
};

export default BookEditForm;
