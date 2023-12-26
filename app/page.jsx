'use client'


import { useState } from 'react';
import axios from 'axios';

const ApiRequestComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = {
        jsonrpc: '2.0',
        id: 1,
        method: 'sns_getAllDomainsForOwner',
        params: [inputValue],
      };
//endpoint looks like this :https://damp-quiet-wish.solana-mainnet.quiknode.pro/98098xxxxx
      const response = await axios.post(
        `${process.env.Key}/`,
        data,
        config
      );

      setResponseData(response.data.result);
    } catch (error) {
      console.error(error);
      setResponseData(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <label className="block mb-2">
        Enter Input:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border p-2"
        />
      </label>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      {responseData && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Response Data:</h2>
          <ul>
            {responseData.map((item) => (
              <li key={item.key} className="mb-2">
                <strong>{item.name}:</strong> {item.key}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApiRequestComponent;