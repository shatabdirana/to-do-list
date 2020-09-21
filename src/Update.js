import React, { useState } from 'react';
import { withRouter } from 'react-router';
import Select from 'react-select';
import axios from 'axios';

export const Update = props => {
  const { bucketId, bucketname, id, name, status } = props.match.params;
  const [listname, setlistName] = useState(name);
  const [bucketType, setBucketType] = useState(bucketname);
  const [bucketIdval, setBucketIdval] = useState(bucketId);
  const [isCompleted, setIsCompleted] = useState(
    status === 'false' ? false : true
  );

  const [iserror, setIsError] = useState(false);

  const onClick = () => {
    var postData = {
      id: parseInt(id),
      name: listname,
      bucketId: parseInt(bucketId),
      status: isCompleted
    };

    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        mode: 'no-cors',
        Accept: 'text/json'
      }
    };

    axios
      .put('http://localhost:58797/ToDoTasks', postData, config)
      .then(res => {
        window.location = '/';
      })
      .catch(err => {
        console.log('AXIOS ERROR: ', err);
        setIsError(true);
      });
  };

  const deleteTask = () => {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        mode: 'no-cors',
        Accept: 'text/json'
      }
    };

    axios
      .delete(`http://localhost:58797/ToDoTasks/?id=${parseInt(id)}`, config)
      .then(res => {
        window.location = '/';
      })
      .catch(err => {
        console.log('AXIOS ERROR: ', err);
        setIsError(true);
      });
  };

  if (iserror) {
    return (
      <div style={{ textAlign: 'center', margin: '50px' }}>error occured</div>
    );
  }

  return (
    <div style={{ margin: '50px', display: 'flex' }}>
      Name
      <input
        type={Text}
        value={listname}
        onChange={event => setlistName(event.target.value)}
      />
      BucketType
      <div style={{ width: '180px' }}>
        <Select
          style={{ width: '50px' }}
          value={{
            label: bucketType,
            value: bucketIdval
          }}
          options={[
            { label: 'everyday activity', value: '1' },
            { label: 'Visa application', value: '2' },
            { label: 'Birthday planning', value: '3' }
          ]}
          onChange={event => {
            setBucketType(event.label);
            setBucketIdval(event.value);
          }}
          placeholder={'Select bucket type'}
        />
      </div>
      completed
      <input
        type="checkbox"
        checked={isCompleted}
        value={isCompleted}
        onChange={event => {
          console.log(event.target.checked);
          setIsCompleted(event.target.checked);
        }}
      />
      <button
        onClick={onClick}
        style={{ height: '20px', width: '50px', margin: '10px' }}
      >
        Update
      </button>
      <button
        onClick={deleteTask}
        style={{ height: '20px', width: '50px', margin: '10px' }}
      >
        Delete
      </button>
    </div>
  );
};

export default withRouter(Update);
