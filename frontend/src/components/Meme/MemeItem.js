import React from 'react';
import axios from 'axios';
import  {NavLink} from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import './View.css';
// import './MemeItem.css';
import Button from '../Button/Button';
import '../Button/Button.css' ;


const MemeItem = props => {
  return (
    <Tbody>
      <Tr>
        {/* <td>{props.id}</td> */}
        <Td>{props.name}</Td>
        <Td>{props.salary}</Td>
        <Td>{props.gender}</Td>
        <Td>{props.team}</Td>
        <Td>{props.address}</Td>
        <Td>
          <NavLink to={`/employees/${props.id}`}>
            <Button>UPDATE</Button>
          </NavLink>
        </Td>
        <Td>
          <button className = "button" onClick={() => { axios.delete(`http://localhost:8081/${props.id}`, window.location.reload()) }}>
            DELETE
          </button>
        </Td>
      </Tr>
      </Tbody>
    );
};

export default MemeItem;
