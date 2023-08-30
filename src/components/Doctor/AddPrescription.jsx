import React, { useState } from "react";
import PatientProfileLayout from "./PatientProfileLayout";
import { addMedicinePrescription, addPrescription } from "../../axios/services/DoctorServices";
import { useParams } from "react-router-dom";

const AddPrescription = () => {
  // const [formValue, setFormValue] = useState({});
  // const [prescriptionItems, setPrescriptionItems] = useState([]);

  // const token = JSON.parse(localStorage.getItem("doctor")).token;
  // const { medicineName, quantity, days, morning, afternoon, evening, night } =
  //   formValue;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formValue);
  //   addMedicinePrescription({ ...formValue }, token);
  // };

  // const onInputChange = (index, name, value, type, checked) => {
  //   const newValue = type === "checkbox" ? checked : value;

  //   const updatedItems = prescriptionItems.map((item, i) =>
  //     i === index ? { ...item, [name]: newValue } : item
  //   );

  //   setPrescriptionItems(updatedItems);
  // };

  // const handleRemoveItem = (index) => {
  //   const updatedItems = prescriptionItems.filter((item, i) => i !== index);
  //   setPrescriptionItems(updatedItems);
  // };

  // const handleAddItem = () => {
  //   // Add an empty prescription item to the list
  //   setPrescriptionItems([
  //     ...prescriptionItems,
  //     {
  //       medicineName: "",
  //       quantity: "",
  //       days: "",
  //       morning: false,
  //       afternoon: false,
  //       evening: false,
  //       night: false,
  //     },
  //   ]);
  // };

  // const AddPrescription = () => {
  //   const [formValue, setFormValue] = useState({});
  //   const [prescriptionItems, setPrescriptionItems] = useState([]);

  //   const { medicineName, quantity, days, morning, afternoon, evening, night } =formValue;

  //   const token = JSON.parse(localStorage.getItem("doctor")).token;

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     console.log(formValue);
  //     addMedicinePrescription({ ...formValue }, token);
  //   };

  //   const onInputChange = (index, name, value, type, checked) => {
  //     const newValue = type === "checkbox" ? checked : value;

  //     const updatedItems = prescriptionItems.map((item, i) =>
  //       i === index ? { ...item, [name]: newValue } : item
  //     );

  //     setPrescriptionItems(updatedItems);
  //   };

  //   const handleRemoveItem = (index) => {
  //     const updatedItems = prescriptionItems.filter((item, i) => i !== index);
  //     setPrescriptionItems(updatedItems);
  //   };

  //   const handleAddItem = () => {
  //     // Add an empty prescription item to the list
  //     setPrescriptionItems([...prescriptionItems, {}]);
  //   };

  const initialState = {
    medicineName: "",
    quantity: "",
    days: "",
  };

  const [formValue, setFormValue] = useState(initialState);
  const [timing, setTiming] = useState([]);

  const { medicineName, quantity, days } = formValue;

  const docId = JSON.parse(localStorage.getItem("doctor")).doctorExists.id;
  const userId = useParams().id
  const token = JSON.parse(localStorage.getItem('doctor')).token

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onAddTiming = (e) => {
    const value = e.target.name;
    if (timing.includes(value)) {
      setTiming(timing.filter((item) => item !== value));
    } else {
      setTiming([...timing, value]);
    }
  };

  const clearFormData = () => {
    setFormValue(initialState)
    setTiming([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...formValue,docId, userId, time: timing };
    console.log({docId, userId, formData});
    const response = await addPrescription(formData,token)
    if(response){
      setFormValue(initialState)
    setTiming([])
    }
  };

  return (
    <PatientProfileLayout>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title mb-0">Add Prescription</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Doctor Information */}
            <div className="row">
              <div className="col-sm-6">
                {/* ... (Doctor information fields) */}
              </div>
              <div className="col-sm-6 text-sm-right">
                {/* ... (Billing information fields) */}
              </div>
            </div>

            {/* Add Item Button */}
            {/* <div className="add-more-item text-right">
              <button
                type="button"
                className="btn btn-link"
                onClick={handleAddItem}
              >
                <i className="fas fa-plus-circle"></i> Add Item
              </button>
            </div> */}

            {/* Render each prescription item as a separate table */}
            <div className="card card-table">
              <div className="card-body">
                <table className="table table-hover table-center">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Days</th>
                      <th>Time</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          value={medicineName}
                          onChange={onInputChange}
                          name="medicineName"
                          placeholder="Medicine Name"
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          value={quantity}
                          onChange={onInputChange}
                          type="text"
                          name="quantity"
                          placeholder="Quantity"
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          value={days}
                          onChange={onInputChange}
                          type="text"
                          name="days"
                          placeholder="Days"
                        />
                      </td>
                      <td>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="morning"
                              checked={timing.includes("morning")}
                              onChange={onAddTiming}
                            />
                            Morning
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="afternoon"
                              checked={timing.includes("afternoon")}
                              onChange={onAddTiming}
                            />
                            Afternoon
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="evening"
                              checked={timing.includes("evening")}
                              onChange={onAddTiming}
                            />
                            Evening
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="night"
                              checked={timing.includes("night")}
                              onChange={onAddTiming}
                            />
                            Night
                          </label>
                        </div>

                        {/* Add other time options */}
                      </td>

                      <td>
                        {/* <button
                          className="btn bg-danger-light trash"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <i className="far fa-trash-alt"></i>
                        </button> */}
                        {/* <a href="#" className="btn bg-danger-light trash">
                          <i className="far fa-trash-alt"></i>
                        </a> */}
                      </td>
                    </tr>
                    {/* ... (Additional rows for the prescription item) */}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Signature */}
            <div className="row">
              <div className="col-md-12 text-right">
                {/* ... (Signature UI elements) */}
              </div>
            </div>

            {/* Form Submission Buttons */}
            <div className="row">
              <div className="col-md-12">
                <div className="submit-section">
                  <button type="submit" className="btn btn-primary submit-btn">
                    Save
                  </button>
                  <button type="reset" onClick={clearFormData} className="btn btn-secondary submit-btn">
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PatientProfileLayout>
  );
};

export default AddPrescription;
