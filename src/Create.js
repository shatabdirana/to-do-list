import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

export const Create = () => {
  const [name, setName] = useState('');
  const [bucketType, setBucketType] = useState('everyday activity');
  const [bucketId, setBucketId] = useState(1);
  const [iserror, setIsError] = useState(false);

  const onClick = () => {
    var postData = {
      name: name,
      bucketId: parseInt(bucketId)
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
      .post('http://localhost:58797/ToDoTasks', postData, config)
      .then(res => {
        setName('');
        setBucketType('everyday activity');
        setBucketId(1);
        window.location = '/';
      })
      .catch(err => {
        console.log('AXIOS ERROR: ', err);
        setName('');
        setBucketType('everyday activity');
        setBucketId(1);
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
        value={name}
        onChange={event => setName(event.target.value)}
      />
      BucketType
      <div style={{ width: '180px' }}>
        <Select
          value={{
            label: bucketType,
            value: bucketId
          }}
          options={[
            { label: 'everyday activity', value: '1' },
            { label: 'Visa application', value: '2' },
            { label: 'Birthday planning', value: '3' }
          ]}
          onChange={event => {
            setBucketType(event.label);
            setBucketId(event.value);
          }}
          placeholder={'Select bucket type'}
        />
      </div>
      <button
        onClick={onClick}
        style={{ height: '20px', width: '50px', margin: '10px' }}
      >
        Create
      </button>
    </div>
  );
};

export default Create;
