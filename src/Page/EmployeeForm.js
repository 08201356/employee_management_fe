import React, {useState, useEffect} from "react";
import EmployeeService from "../Service/EmployeeService";
import {useParams, useNavigate} from "react-router-dom";

const EmployeeForm = () => {
    const [employee, setEmployee] = useState({name:'', age:'', position:'DEVELOPER', email:''});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id).then((res) => {
                setEmployee(res.data)
            });
        };
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            EmployeeService.updateEmployee(employee, id).then(() => {
                navigate('/');
            });
        } else {
            EmployeeService.createEmployee(employee).then(() => {
                navigate('/');
            });
        }
    };

    return (
        <div className="container mt-5" style={{maxWidth: "600px"}}>
            <h2 className="text-center mb-4">{id? "Update Employee Info" : "Add New Employee"}</h2>
            <div className="border p-4 rounded shadow">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name: </label>
                        <input type="text" className="form-control" id="name" name="name" value={employee.name}
                               onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Age: </label>
                        <input type="number" className="form-control" id="age" name="age" value={employee.age}
                               onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position" className="form-label">Position: </label>
                        <select className="form-select" id="position" name="position" value={employee.position}
                                onChange={handleChange}>
                            <option value="DEVELOPER">Developer</option>
                            <option value="DESIGNER">Designer</option>
                            <option value="HR">HR</option>
                            <option value="MANAGER">Manager</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email: </label>
                        <input type="email" className="form-control" id="email" name="email" value={employee.email}
                               onChange={handleChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">{id ? "Update" : "Add"}</button>
                </form>
            </div>
        </div>
    )
}

export default EmployeeForm;