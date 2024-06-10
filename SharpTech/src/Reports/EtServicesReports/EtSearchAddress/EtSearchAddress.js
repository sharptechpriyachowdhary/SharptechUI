import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function EtSearchAddress() {
    const [partialAddress, setPartialAddress] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (partialAddress.length > 2) {
                try {

                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:8080/partial/search/${partialAddress}`, {

                        headers: {
                            'Authorization': `Bearer ${token}`
                        }

                    });
                    setSuggestions(response.data);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                }
            } else {
                setSuggestions([]);
            }
        };
       
        fetchSuggestions();
    }, [partialAddress]);

    const handleAddressChange = (event) => {
        setPartialAddress(event.target.value);
    };

    const handleSuggestionClick = (address) => {
        setSelectedAddress(address);
        setPartialAddress(address.address); // Update input with full address
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        if (selectedAddress) {
            navigate(`/EtServiceDisplay/${selectedAddress.orderNumber}`);
        } else {
            alert('Please select an address');
        }
    };

    return (
        <div className="address-search-container">
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Search By Address</h2>
                <input
                    className="address-input"
                    type="text"
                    placeholder="Search Address"
                    value={partialAddress}
                    onChange={handleAddressChange}
                />
                {suggestions.length > 0 && (
                    <div className="suggestions-dropdown">
                        <select className="suggestions" onChange={(e) => handleSuggestionClick(JSON.parse(e.target.value))}>
                            <option value="">Select Address</option>
                            {suggestions.map((address, index) => (
                                <option key={address.address} value={JSON.stringify(address)}>
                                    {address.address} (Order Number: {address.orderNumber})
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <button className="submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EtSearchAddress;
