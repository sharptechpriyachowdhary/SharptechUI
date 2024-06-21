import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import './DasAddressSearch.css'; // Ensure you have the CSS file for styling

const loadCSS = (href) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS file: ${href}`));
    document.head.appendChild(link);
  });
};

function DasAddressSearch() {
  const [partialAddress, setPartialAddress] = useState(''); // Ensure it's always initialized as a string
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false); // State to manage alert visibility

  useEffect(() => {
    // Load Font Awesome CSS
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css')
      .then(() => console.log('Font Awesome CSS loaded successfully'))
      .catch((error) => console.error('Error loading Font Awesome CSS:', error));
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (partialAddress && partialAddress.length > 2) {
        try {
          setLoading(true); // Set loading to true while fetching suggestions
          const token = localStorage.getItem('token');
          console.log(`Fetching suggestions for: ${partialAddress.toLowerCase()}`);
          const response = await axios.get(`http://localhost:8080/search/${partialAddress.toLowerCase()}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('Suggestions received:', response.data);
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching suggestions
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchSuggestions();
    }, 500); // Adjust the debounce delay as needed

    return () => clearTimeout(debounceFetch); // Cleanup timeout on component unmount or partialAddress change
  }, [partialAddress]);

  const handleAddressChange = (event) => {
    setPartialAddress(event.target.value);
    setAlertShown(false); // Reset alert visibility on address change
  };

  const handleSuggestionClick = (address) => {
    setSelectedAddress(address);
    setPartialAddress(address.address); // Update input with full address
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true); // Set loading to true while submitting form
    try {
      if (selectedAddress) {
        navigate(`/DasDisplay/${selectedAddress.orderNumber}`);
      } else {
        alert('Please select an address');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // Set loading to false after form submission
    }
  };

  return (
    <div className="address-search-container">
      <h1 className="address-search-heading">Address Search</h1>
      <form className="address-search-form" onSubmit={handleSubmit}>
        <div className="address-search-input-wrapper">
          <i className="fas fa-search address-search-icon"></i>
          <input
            className="address-search-input"
            type="text"
            placeholder="Search Address"
            value={partialAddress}
            onChange={handleAddressChange}
          />
          {suggestions.length > 0 && partialAddress.length > 2 && (
            <div className="address-search-suggestions">
              <select
                className="address-search-suggestions-select"
                onChange={(e) => handleSuggestionClick(JSON.parse(e.target.value))}
              >
                <option value="">Select Address</option>
                {suggestions.map((address) => (
                  <option key={address.orderNumber} value={JSON.stringify(address)}>
                    {address.address} (Order Number: {address.orderNumber})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button className="address-search-submit-button" type="submit" disabled={loading}>
          {loading ? <ProgressSpinner style={{ width: '24px', height: '24px' }} strokeWidth="4" /> : 'Search'}
        </button>
      </form>
    </div>
  );
}

export default DasAddressSearch;
