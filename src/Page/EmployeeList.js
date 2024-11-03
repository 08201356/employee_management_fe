import React, { useState, useEffect } from "react";
import EmployeeService from "../Service/EmployeeService";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [direction, setDirection] = useState("asc");

    useEffect(() => {
        fetchEmployees();
    }, [sortBy, direction]);

    const fetchEmployees = () => {
        EmployeeService.getSortedEmployees(sortBy, direction).then((response) => {
            setEmployees(response.data);
        });
    };

    const handleSearch = () => {
        if (searchTerm) {
            EmployeeService.searchEmployeeByName(searchTerm).then((response) => {
                setEmployees(response.data);
            });
        } else {
            fetchEmployees();
        }
    };

    const handleSort = (field) => {
        setSortBy(field);
        setDirection(direction === "asc" ? "desc" : "asc");
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Employee List</h2>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
                <div className="input-group" style={{ maxWidth: "300px" }}>
                    <input type="text" className="form-control" placeholder="Search by Name" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}/>
                    <button className="btn btn-outline-secondary" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="mb-3">
                <button className="btn btn-link" onClick={() => handleSort("name")}>
                    Sort by Name {direction === "asc" ? "(A-Z)" : "(Z-A)"}</button>
                <button className="btn btn-link" onClick={() => handleSort("age")}>
                    Sort by Age {direction === "asc" ? "(Ascending)" : "(Descending)"}</button>
            </div>
            <div className="border p-4 rounded shadow">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.age}</td>
                            <td>{employee.position}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2"
                                        onClick={() => editEmployee(employee.id)}>Edit
                                </button>
                                <button className="btn btn-danger btn-sm"
                                        onClick={() => deleteEmployee(employee.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const addEmployee = () => {
    window.location.href = "/add";
};

const editEmployee = (id) => {
    window.location.href = `/update/${id}`;
};

const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id).then(() => {
        window.location.reload();
    });
};

export default EmployeeList;
