// ./src/components/book/BookForm.js
import React from 'react';
import { FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';

const BookForm = (props) => {
  return (
    <form
    className="form form-horizontal" id="myForm" onSubmit={props.submitBook}
    >

    <div className="row">
    <div className="col-md-12">
    <FormGroup>
          <ControlLabel>Title: </ControlLabel>
            <FormControl
              type="text" placeholder="Enter title"
              name="title"
               />
        </FormGroup>
        </div>
      <div className="col-md-6">
        <FormGroup >
        <ControlLabel>PDF File: </ControlLabel>
        <input className="form-control"
            type="file"
            name="file"
           id="file" accept=".pdf,.PDF" onChange={props.handleUploadFile}/>
      </FormGroup>
    </div>
    <div className="col-md-6">
        <FormGroup>
          <ControlLabel>Author: </ControlLabel>
            <FormControl
              type="text"
              name="author"
               placeholder="Enter author"/>
        </FormGroup>
     </div>
     <div className="col-md-6">
        <FormGroup>
          <ControlLabel>Price: </ControlLabel>
            <FormControl
              type="number"
              name="price"
              placeholder="Enter price" />
          </FormGroup>
       </div>
       <div className="col-md-6">
        <FormGroup>
          <ControlLabel>Publication Year: </ControlLabel>
            <FormControl
              type="text"
              name="year"
              placeholder="Enter publication year" />
          </FormGroup>
        </div>
    </div>

        <FormGroup>
            <Button type="submit" bsStyle="success" bsSize="large" block>Submit</Button>
        </FormGroup>
    </form>
  );
};

export default BookForm;
