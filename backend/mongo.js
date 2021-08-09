const express = require('express');
const router = express.Router() ;
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;


const url = 'mongodb+srv://deepak_15:11911026@cluster0.wqfop.mongodb.net/employee_db?retryWrites=true&w=majority';

const createEmployees = async (req, res, next) => {  
    const newEmployee = {
    "name" : req.body.name,
    "salary" : req.body.salary,
    "gender" : req.body.gender, 
    "team" : req.body.team, 
    "address" : req.body.address 
  };
  
  const client = new MongoClient(url);

  try {
    await client.connect({
      useCreateIndex : true,
      useNewUrlParser : true,
      useUnifiedTopology : true
    }, () => console.log("Database connected successfully"));

    const db = client.db("employee_db");
    db.collection('employees').insertOne(newEmployee);
    client.close();
  } catch (error) {
    client.close();
    return res.json({message: 'Could not store data.'});
  };
  
  const resJson = {
    id : newEmployee._id
  };
  
  res.json(resJson);
};




const getEmployees = async (req, res, next) => {
  const client = new MongoClient(url);
  let employees;

  try {
    await client.connect({
      useCreateIndex : true,
      useNewUrlParser : true,
      useUnifiedTopology : true
    }, () => console.log("Database connected successfully"));

    const db = client.db("employee_db"); 
    employees = await db.collection('employees').find().sort({ "_id": -1 }).limit(100).toArray();
    client.close();
  } catch (error) {
    client.close();
    return res.json({ message: 'Could not retrieve products.' });
  };
  
  employees.forEach((employee)=>{
    employee["id"] = employee["_id"];
    delete employee["_id"];
  });

  return res.json(employees);
}




const getEmployeesById = async (req, res, next) => {
  const client = new MongoClient(url);
  let employee;

  try {
    await client.connect({
      useCreateIndex : true,
      useNewUrlParser : true,
      useUnifiedTopology : true
    }, () => console.log("Database connected successfully"));

    const db = client.db("employee_db"); 
    const myQuery = {_id : ObjectID(req.params.id)};
    employee = await db.collection('employees').findOne(myQuery);
    client.close();
  } catch (error) {
    res.status(404);
    client.close();
    return res.json({ message: 'Could not retrieve Meme. Please check Id.' });
  }
  
  if(!employee){
    res.status(404);
    return res.json({ message: 'Could not retrieve Meme. Please check Id.' });  
  }

  employee["id"] = employee["_id"];
  delete employee["_id"];

  return res.json(employee);
}


router.delete('/:id', async (req, res) => {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db("employee_db"); 
    const myQuery = {_id : ObjectID(req.params.id)};
    const data = await db.collection('employees').deleteOne(myQuery);
    client.close();
    return res.json(data);
  }catch (error) {
        res.status(404);
        client.close();
        return res.json({ message: 'Could not retrieve Employee. Please check Id.' });
      }
})


const updateEmployees = async (req, res, next) => {
  const client = new MongoClient(url) ;
  let updateEmployee ;

  try{
    await client.connect({
      useCreateIndex : true,
      useNewUrlParser : true,
      useUnifiedTopology : true
    }, () => console.log("Database connected successfully")) ;

    const myQuery = {_id : ObjectID(req.params.id)};

    const newValues = { $set: {
      "name" : req.body.name,
      "salary" : req.body.salary,
      "gender" : req.body.gender, 
      "team" : req.body.team, 
      "address" : req.body.address 
    }} ;

    const db = client.db("employee_db") ;
    updateEmployee = await db.collection("employees").updateOne(myQuery, newValues) ;
    client.close();
  } catch(error){
    client.close() ;
    return res.json({message: "could not update the data."});
  };

  return res.json({"updateEmployee" : updateEmployee}) ;
}



exports.getEmployees = getEmployees;
exports.createEmployees = createEmployees;
exports.getEmployeesById = getEmployeesById;
exports.updateEmployees = updateEmployees;
exports.router = router;
