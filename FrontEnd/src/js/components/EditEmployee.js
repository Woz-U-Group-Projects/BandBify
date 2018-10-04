//import the necessary files
import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

//create a class for displaying the modal for editing an existing employee and export it
export class EditEmployee extends React.Component {
  constructor(props) {//create a state to handle the employee to be edited
    super(props);

    this.handleEmployeeHasBeenEdited = this.handleEmployeeHasBeenEdited.bind(this);
    this.sendFetchOfEdits = this.sendFetchOfEdits.bind(this);
  }

  handleEmployeeHasBeenEdited(e) {  // change the name to reflect user input
    this.setState({[e.target.name]: e.target.value});  // compile value from the input field
  }

  sendFetchOfEdits()  {
    console.log(this.props);
    console.log(this.state);
    
    //URL will be PUT /api/employees/{id} for edits or POST /api/employees for adding
    let url = 'http://localhost:5000/api/employees/' + (this.props.employee ? this.props.employee.employeeId : '');
    fetch(url, {
      method: (this.props.employee ? 'PUT' : 'POST'),
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(this.state)
    })
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));
  }

  render() {
    let addOrEditLabel = this.props.addOrEditLabel;
    // let currentlyEditing = this.props.currentlyEditing;
    const onShow = this.props.onShow;
    const emp = (this.props.employee ? this.props.employee : {});

    return(
      <Modal show={onShow} onHide={this.props.onCancel}>

        <Modal.Header closeButton>
          <Modal.Title>{(emp.name ? emp.name : "Add New Employee")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {(!emp.name ? (
            <FormGroup controlId="formControlsName">
              <ControlLabel>Name:</ControlLabel>
              <FormControl name="name" type="text" required onChange={this.handleEmployeeHasBeenEdited} placeholder="Name" />
            </FormGroup>
          ) : "")}
          
           <FormGroup controlId="formControlsName">
             <ControlLabel>Department:</ControlLabel>
             <FormControl name="department" type="text" required onChange={this.handleEmployeeHasBeenEdited} defaultValue={emp.Department} placeholder="Department" />
           </FormGroup>

           <FormGroup controlId="formControlsName">
             <ControlLabel>Supervisor</ControlLabel>
             <FormControl name="supervisor" type="text" required onChange={this.handleEmployeeHasBeenEdited} defaultValue={emp.Supervisor} placeholder="Supervisor" />
           </FormGroup>

           <FormGroup controlId="formControlsName">
             <ControlLabel>Email</ControlLabel>
             <FormControl name="email" type="text" required onChange={this.handleEmployeeHasBeenEdited}  defaultValue={emp.Email} placeholder={emp.Email} />
           </FormGroup> 

           <FormGroup controlId="formControlsName">
             <ControlLabel>Phone Ext:</ControlLabel>
             <FormControl name="phone" type="text" required onChange={this.handleEmployeeHasBeenEdited} defaultValue={emp.Phone} placeholder={emp.Phone} />             
           </FormGroup> 

        </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="success" onClick={this.sendFetchOfEdits}>Save</Button>
        </Modal.Footer>
   
      </Modal>
    );
  }
};
