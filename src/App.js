import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import EmployeeList from "./Page/EmployeeList";
import EmployeeForm from "./Page/EmployeeForm";

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<EmployeeList/>}/>
                <Route path="/add" element={<EmployeeForm/>}/>
                <Route path="/update/:id" element={<EmployeeForm/>}/>
            </Routes>
        </Router>
    )
}

export default App;