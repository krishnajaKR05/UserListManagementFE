import React from "react";

export default function ManageUser(){
    return(
        <div>
       <div className="modal">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Create New User</h5>
      </div>
      <div className="modal-body">
        <label className="form-label">First Name*</label>
        <input className="form-control" type="text" />

        <label className="form-label">Last Name*</label>
        <input className="form-control" type="text" />

        <label className="form-label">Email*</label>
        <input className="form-control" type="text" />

        <label className="form-label">Profile Image Link*</label>
        <input className="form-control" type="text" />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</div>
</div>
    )
}