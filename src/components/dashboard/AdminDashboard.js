import React from "react";
import PatientsList from '../patients/PatientsList'

const AdminDashboard = (props) => {
    const { filteredPatients } = props;
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className="col-md-6 offset-md-3">
                    <PatientsList patients = {filteredPatients}/>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard