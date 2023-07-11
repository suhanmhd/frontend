import React, { useState } from 'react'
import { MDBCard, MDBCardBody,MDBValidation,MDBValidationItem,MDBInput ,MDBBtn } from 'mdb-react-ui-kit'
import { addCategory } from '../../../axios/services/AdminServices';


const AddCategory = (props) => {

    const initialState = {
      departmentName : ""
    }

    const [formValue, setFormValue] = useState(initialState);
    const { departmentName } = formValue;
    const token = JSON.parse(localStorage.getItem('admin')).token;
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    //   console.log(formValue);
        await addCategory(departmentName, token);
        props.onAdding(departmentName)
    };

    const onInputChange = (e) => {
      let { name, value } = e.target;
      setFormValue({ ...formValue, [name]: value });
    };
  

  return (
    <>
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
      }}
    >
      <MDBCard alignment="center">
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide sub category"
              invalid
            >
              <div className="col-md-12">
                <MDBInput
                  label="Enter sub category"
                  type="text"
                  value={departmentName}
                  name="departmentName"
                  onChange={onInputChange}
                  required
                  invalid
                />
              </div>
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                Add category
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>

      </div>
    </>
    )
}

export default AddCategory