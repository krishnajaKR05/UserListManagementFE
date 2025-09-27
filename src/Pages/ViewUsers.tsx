import React from "react";

export default function ViewUsers() {
  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <div className="container bg-white h-75">
        {/* header */}
        <div className="row">
          <div className="col-8">
            <h3>Users</h3>
          </div>
          <div className="col-2">
            <div className="input-group">
              <input className="form-control" type="text" />
              <i className="bi bi-search input-group-text"></i>
            </div>
          </div>
          <div className="col-2">
            <button className="btn btn-primary">Create User</button>
          </div>
        </div>

        {/* view */}
        <div className="input-group">
            <button className="btn btn-outline-dark"><i className="bi bi-table me-2"></i>Table</button>   
            <button className="btn btn-outline-dark"><i className="bi bi-card-list me-2"></i>Card</button>   
           
        </div>

        {/* table */}
        <div>
        <table className="table table-stripped">
<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>John</td>
      <td>Doe</td>
      <td>@social</td>
    </tr>
  </tbody>
        </table>
        </div>

        
      </div>
      {/* pagination */}
        <div className="container mt-4">
            <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-end">
    <li className="page-item disabled me-2">
      <a className="page-link">{"<"}</a>
    </li>
    <li className="page-item me-2">
      <a className="page-link" href="#">1</a>
    </li>
    <li className="page-item me-2">
      <a className="page-link" href="#">2</a>
    </li>
    <li className="page-item me-2">
      <a className="page-link" href="#">3</a>
    </li>
    <li className="page-item">
      <a className="page-link" href="#">{">"}</a>
    </li>
  </ul>
</nav>
        </div>
    </div>
  );
}
