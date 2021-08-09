import React from 'react';
import './App.css';
import Update_Employee from './components/Meme/UpdateMeme';

const URL = 'http://localhost:8081'

function Update() {
  const updateEmployeeHandler = async (EmployeeName, EmployeeSalary, EmployeeGender, EmployeeTeam, EmployeeAddress, EmployeeId) => {
    
    let hasError = false;
    try{
    const updateEmployee = {
      name: EmployeeName,
      salary: EmployeeSalary,
      gender: EmployeeGender,
      team: EmployeeTeam,
      address: EmployeeAddress,
      // _id: EmployeeId
    };
      
    const response = await fetch(`${URL}/employees/${EmployeeId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateEmployee),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      hasError = true;
    }

    const responseData = await response.json();

    if (hasError) {
      throw new Error(responseData.message);
    }

  } catch(error) {
    alert(error.message || 'Something went wrong!');
  }
  
  return hasError;
    
  };

  return (
    <Update_Employee onUpdateEmployee={updateEmployeeHandler} />
  );
}

export default Update;
