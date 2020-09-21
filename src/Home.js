import React, { useState, useEffect } from 'react';
import { Create } from './Create';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';

export const Home = () => {
  const [rowData, setRowData] = useState([]);
  const [isfulfilled, setIsFulfilled] = useState(false);

  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      mode: 'no-cors',
      Accept: 'text/json'
    }
  };

  useEffect(() => {
    if (!isfulfilled) {
      axios
        .get(
          'http://localhost:58797/ToDoTasks',
          { withCredentials: false },
          config
        )
        .then(response => {
          setRowData(response.data);
          setIsFulfilled(true);
        })
        .catch(error => {
          console.log(error);
          setIsFulfilled(true);
        });
    }
  }, [config, isfulfilled]);

  const columnDefs = [
    {
      headerName: 'Name',
      field: 'name',
      cellRenderer: cell =>
        `<a href="/Update/${cell.data.id}/${cell.data.name}/${cell.data.bucketId}/${cell.data.bucketname}/${cell.data.status}" >${cell.value}</a>`
    },
    { headerName: 'Bucketname', field: 'bucketname' },
    { headerName: 'Status', field: 'status' }
  ];

  function mapRowData(rowData) {
    if (rowData.length > 1) {
      return rowData.map(i => {
        return {
          ...i,
          status: i.status === true ? 'complete' : 'incomplete'
        };
      });
    }
    return [];
  }

  return (
    <>
      <Create />
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '500px'
        }}
      >
        <AgGridReact columnDefs={columnDefs} rowData={mapRowData(rowData)} />
      </div>
    </>
  );
};
