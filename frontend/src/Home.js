import React, { useState, useEffect } from 'react';
import NewEmployee from './components/Meme/NewMeme';
import MemeList from './components/Meme/MemeList';
import './App.css';

const URL = 'http://localhost:8081';

function Home() {
  const [loadedEmployees, setLoadedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      const response = await fetch(URL + '/employees');

      const responseData = await response.json();
      

      setLoadedEmployees(responseData);
      setIsLoading(false);
    };

    fetchEmployees();
  }, []);

  const addEmployeeHandler = async (EmployeeName, EmployeeSalary, EmployeeGender, EmployeeTeam, EmployeeAddress) => {
    try {
      const newEmployee = {
        name: EmployeeName,
        salary: EmployeeSalary,
        gender: EmployeeGender,
        team: EmployeeTeam,
        address: EmployeeAddress
      };
      let hasError = false;

      const response = await fetch(URL + '/employees', {
        method: 'POST',
        body: JSON.stringify(newEmployee),
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
     
      newEmployee.id = await responseData.id;
      
      setLoadedEmployees(prevEmployee => {
        return [newEmployee, ...prevEmployee];
      });

    } catch (error) {
      alert(error.message || 'Something went wrong!');
    }
  };

  return (
      <main>
        <NewEmployee onAddEmployee={addEmployeeHandler} />
        {isLoading && <p className="loader">Loading...</p>}
        {!isLoading && <MemeList items={loadedEmployees} />}
      </main>    
  );
}

export default Home;
