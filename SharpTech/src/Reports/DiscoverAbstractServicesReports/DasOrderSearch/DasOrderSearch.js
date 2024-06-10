import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'


function DasOrderSearch() {

  const [orderNumber, setOrderNumber] = useState("");
  const [etservice, setEtService] = useState(null);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleSubmit = async (e) => {


    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const result = await axios.get(`http://localhost:8080/fetch/${orderNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEtService(result.data);
      window.alert("Data Fetch Sucessfully")
      navigate(`/DasDisplay/${orderNumber}`);
      setError(null); // Clear previous error if any
    } catch (error) {
      setEtService(null); // Clear user data
      setError("Error fetching user data"); // Set error message
      console.error("Error fetching user data:", error);
    }
  };
  return (

    <div>
      <div className="EtService">
        <form className='login-form' onSubmit={handleSubmit}>
          <h2>Serch By OrderNumber</h2>
          <div>
            <label>OrderNumber:</label>
            <input type="orderNumber" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default DasOrderSearch;