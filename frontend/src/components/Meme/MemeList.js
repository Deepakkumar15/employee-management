import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import MemeItem from './MemeItem';
// import './MemeList.css';
import './View.css';

function MemeList(props) {
  let content;
  if (!props.items || props.items.length === 0) {
    content = <p>Could not find any Employee. Maybe add one?</p>;
  } else {
    content = (
      <Table className="meme-list">
        <Thead>
          <Tr>
            {/* <th>ID</th> */}
            <Th>Name</Th>
            <Th>Salary</Th>
            <Th>Gender</Th>
            <Th>Team</Th>
            <Th>Address</Th>
            <Th>Update</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>

        {props.items.map(p => (
          <MemeItem key={p.id} id={p.id} name={p.name} salary={p.salary} gender={p.gender} team={p.team} address={p.address} />
        ))}
      </Table>
    );
  }

  return <section id="meme">{content}</section>;
}

export default MemeList;
