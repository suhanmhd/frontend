import React from "react";
import Navbar from "../../components/Navbar";

const ViewSinglePrescription = () => {
  return (
    <>
      <Navbar />
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <div class="biller-info">
                <h4 class="d-block">Prescribed by Dr. Darren Elder</h4>
                <span class="d-block text-sm text-muted">Dentist</span>
                <span class="d-block text-sm text-muted">
                  Newyork, United States
                </span>
              </div>
            </div>
            <div class="col-sm-6 text-sm-right">
              <div class="billing-info">
                <h4 class="d-block">1 November 2019</h4>
                <span class="d-block text-muted">#INV0001</span>
              </div>
            </div>
          </div>

          <div class="card card-table">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover table-center">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "200px" }}>Name</th>
                      <th style={{ minWidth: "100px" }}>Quantity</th>
                      <th style={{ minWidth: "100px" }}>Days</th>
                      <th style={{ minWidth: "100px" }}>Time</th>
                      <th style={{ minWidth: "80px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input class="form-control" type="text" disabled/>
                      </td>
                      <td>
                        <input class="form-control" type="text" disabled/>
                      </td>
                      <td>
                        <input class="form-control" type="text" disabled/>
                      </td>
                      <td>
                        <div class="form-check form-check-inline">
                          <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" disabled/>{" "}
                            Morning
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" disabled/>{" "}
                            Afternoon
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" disabled/>{" "}
                            Evening
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" disabled/>{" "}
                            Night
                          </label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* <div class="row">
            <div class="col-md-12">
              <div class="submit-section">
                <button type="submit" class="btn btn-primary submit-btn">
                  Save
                </button>
                <button type="reset" class="btn btn-secondary submit-btn">
                  Clear
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ViewSinglePrescription;
