import React, { useState } from "react";
import PatientProfileLayout from "./PatientProfileLayout";
import { addMedicinePrescription } from "../../axios/services/DoctorServices";



const AddPrescription = () => {
    const [formValue, setFormValue] = useState({});
    const [prescriptionItems, setPrescriptionItems] = useState([]);
  
    const token = JSON.parse(localStorage.getItem("doctor")).token;
    const { medicineName, quantity, days, morning, afternoon, evening, night } =formValue;
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formValue);
      addMedicinePrescription({ ...formValue }, token);
    };
  
    const onInputChange = (index, name, value, type, checked) => {
      const newValue = type === "checkbox" ? checked : value;
  
      const updatedItems = prescriptionItems.map((item, i) =>
        i === index ? { ...item, [name]: newValue } : item
      );
  
      setPrescriptionItems(updatedItems);
    };
  
    const handleRemoveItem = (index) => {
      const updatedItems = prescriptionItems.filter((item, i) => i !== index);
      setPrescriptionItems(updatedItems);
    };
  
    const handleAddItem = () => {
      // Add an empty prescription item to the list
      setPrescriptionItems([
        ...prescriptionItems,
        {
          medicineName: "",
          quantity: "",
          days: "",
          morning: false,
          afternoon: false,
          evening: false,
          night: false,
        },
      ]);
    };

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
            <div className="add-more-item text-right">
              <button
                type="button"
                className="btn btn-link"
                onClick={handleAddItem}
              >
                <i className="fas fa-plus-circle"></i> Add Item
              </button>
            </div>

            {/* Render each prescription item as a separate table */}
            {prescriptionItems.map((item, index) => (
              <div className="card card-table" key={index}>
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
                            value={item.medicineName}
                            onChange={(e) =>
                              onInputChange(index, "medicineName", e.target.value, "text")
                            }
                            name="medicineName"
                            placeholder="Medicine Name"
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            value={item.quantity}
                            onChange={(e) =>
                              onInputChange(index, "quantity", e.target.value, "text")
                            }
                            type="text"
                            name="quantity"
                            placeholder="Quantity"
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            value={item.days}
                            onChange={(e) =>
                              onInputChange(index, "days", e.target.value, "text")
                            }
                            type="text"
                            name="days"
                            placeholder="Days"
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
                              checked={morning}
                              onChange={onInputChange}
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
                              checked={afternoon}
                              onChange={onInputChange}
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
                              checked={evening}
                              onChange={onInputChange}
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
                              checked={night}
                              onChange={onInputChange}
                            />
                            Night
                          </label>
                        </div>

                        {/* Add other time options */}
                      </td>

                      <td>
                      <button
                           
                            className="btn bg-danger-light trash"
                            onClick={() => handleRemoveItem(index)}
                          >
                            <i className="far fa-trash-alt"></i>
                          </button>
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
            ))}

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
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                  >
                    Save
                  </button>
                  <button type="reset" className="btn btn-secondary submit-btn">
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























// import React, { useState } from "react";
// import axios from "axios";
// import PatientProfileLayout from "./PatientProfileLayout";
// import { addMedicinePrescription } from "../../axios/services/DoctorServices";

// const AddPrescription = () => {
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [formValue, setFormValue] = useState({});

//   const { medicineName, quantity, days, morning, afternoon, evening, night } =
//     formValue;

//   const token = JSON.parse(localStorage.getItem("doctor")).token;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formValue);
//     addMedicinePrescription({ ...formValue }, token);
//   };

//   const onInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;
//     setFormValue({ ...formValue, [name]: newValue });
//   };

//   return (
//     <PatientProfileLayout>
//       <div className="card">
//         <div className="card-header">
//           <h4 className="card-title mb-0">Add Prescription</h4>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             {/* Doctor Information */}
//             <div className="row">
//               <div className="col-sm-6">
//                 <div className="biller-info">
//                   <h4 className="d-block">Dr. Darren Elder</h4>
//                   <span className="d-block text-sm text-muted">Dentist</span>
//                   <span className="d-block text-sm text-muted">
//                     New York, United States
//                   </span>
//                 </div>
//               </div>
//               <div className="col-sm-6 text-sm-right">
//                 <div className="billing-info">
//                   <h4 className="d-block">1 November 2019</h4>
//                   <span className="d-block text-muted">#INV0001</span>
//                 </div>
//               </div>
//             </div>
//              <div class="add-more-item text-right">
//             <a href="javascript:void(0);">
//               <i class="fas fa-plus-circle"></i> Add Item
//             </a>
//         </div>

//             {/* Add Prescription Items */}
//             <div className="card card-table">
//               <div className="card-body">
//                 <table className="table table-hover table-center">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Quantity</th>
//                       <th>Days</th>
//                       <th>Time</th>
//                       <th></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>
//                         <input
//                           className="form-control"
//                           type="text"
//                           value={medicineName}
//                           onChange={onInputChange}
//                           name="medicineName"
//                           placeholder="Medicine Name"
//                         />
//                       </td>
//                       <td>
//                         <input
//                           className="form-control"
//                           value={quantity}
//                           onChange={onInputChange}
//                           type="text"
//                           name="quantity"
//                           placeholder="Quantity"
//                         />
//                       </td>
//                       <td>
//                         <input
//                           className="form-control"
//                           value={days}
//                           onChange={onInputChange}
//                           type="text"
//                           name="days"
//                           placeholder="Days"
//                         />
//                       </td>
//                       <td>
//                         <div className="form-check form-check-inline">
//                           <label className="form-check-label">
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               name="morning"
//                               checked={morning}
//                               onChange={onInputChange}
//                             />
//                             Morning
//                           </label>
//                         </div>

//                         <div className="form-check form-check-inline">
//                           <label className="form-check-label">
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               name="afternoon"
//                               checked={afternoon}
//                               onChange={onInputChange}
//                             />
//                             Afternoon
//                           </label>
//                         </div>

//                         <div className="form-check form-check-inline">
//                           <label className="form-check-label">
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               name="evening"
//                               checked={evening}
//                               onChange={onInputChange}
//                             />
//                             Evening
//                           </label>
//                         </div>
//                         <div className="form-check form-check-inline">
//                           <label className="form-check-label">
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               name="night"
//                               checked={night}
//                               onChange={onInputChange}
//                             />
//                             Night
//                           </label>
//                         </div>

//                         {/* Add other time options */}
//                       </td>

//                       <td>
//                         <a href="#" className="btn bg-danger-light trash">
//                           <i className="far fa-trash-alt"></i>
//                         </a>
//                       </td>
//                     </tr>
//                     {/* Add more rows */}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Signature */}
//             <div className="row">
//               <div className="col-md-12 text-right">
//                 <div className="signature-wrap">
//                   <div className="signature">Click here to sign</div>
//                   <div className="sign-name">
//                     <p className="mb-0">( Dr. Darren Elder )</p>
//                     <span className="text-muted">Signature</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Form Submission Buttons */}
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="submit-section">
//                   <button
//                     //   onClick={handleSubmit}
//                     type="submit"
//                     className="btn btn-primary submit-btn"
//                   >
//                     Save
//                   </button>
//                   <button type="reset" className="btn btn-secondary submit-btn">
//                     Clear
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </PatientProfileLayout>
//   );
// };

// export default AddPrescription;
