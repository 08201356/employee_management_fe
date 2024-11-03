import axios from 'axios'

const EMPLOYEE_BASE_URL = "http://localhost:8080/employees";

class EmployeeService {
    getAllEmployees(){
        return axios.get(EMPLOYEE_BASE_URL);
    }

    getEmployeeById(employeeId){
        return axios.get(`${EMPLOYEE_BASE_URL}/${employeeId}`);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_BASE_URL, employee);
    }

    updateEmployee(employee, employeeId){
        return axios.put(`${EMPLOYEE_BASE_URL}/${employeeId}`, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(`${EMPLOYEE_BASE_URL}/${employeeId}`);
    }

    searchEmployeeByName(name){
        return axios.get(`${EMPLOYEE_BASE_URL}/search`, { params: {name} })
    }

    getSortedEmployees(sortBy, direction) {
        return axios.get(`${EMPLOYEE_BASE_URL}/sorted`, { params: { sortBy, direction } })
    }
}

export default new EmployeeService();