import React, { useState } from 'react';

/* 

 The AddressForm component is a form that collects the user's address information.
 It uses the useState hook to manage the form state and the fetch API to fetch city names from zip codes.
 The form has validation for phone, email, and VAT number based on the selected country.
 The form has a button to continue to the payment step.
 
 */

const AddressForm = () => {
  const [country, setCountry] = useState('Denmark');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [vat, setVat] = useState('');
  const [countryCode, setCountryCode] = useState('');


  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  // Fetch city name from zip code when country and zip are valid
  const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value;
    setZip(zip);
    if (country === 'Denmark') {
      const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zip}`);
      const data = await response.json();
      setCity(data.navn);
    }
  };


  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);

  }


  // Validate phone number based on the selected country
  const validatePhone = (phone: string) => {
    const fullPhone = countryCode + phone;
    return country === 'Denmark' ? /^\d{11}$/.test(fullPhone) : true;
  };

  // Validate email address
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate VAT number based on the selected country
  const validateVat = (vat: string) => {

    return country === 'Denmark' ? /^\d{8}$/.test(vat) : true;

  };

  // Handle payment 
  const handlePayment = () => {
    window.location.href = '/payment';
  };


  return (
    <div className="form-address-card">
      <div className="form-address-card-header">
        <h2>Shipment Address</h2>
        <select value={country} onChange={handleCountryChange}>
          <option value="Denmark">Denmark</option>
          <option value="Sweden" disabled>Sweden</option>
          <option value="Norway" disabled>Norway</option>
        </select>
      </div>
      <form className='form-card'>


        <div className='address-country'>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name" required
          />
          <input
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            placeholder="Address Line 1" required
          />
          <input
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Address Line 2"
          />
          <input
            type="text"
            value={zip}
            onChange={handleZipChange}
            placeholder="Zip Code" required
          />
          <input
            type="text"
            value={city}
            disabled placeholder="City"
          />
          <select
            value={countryCode}
            onChange={handleCountryCodeChange}
          >

            <option
              value="45">+45
            </option>
            <option
              value="46"
              disabled>+46
            </option>
            <option
              value="47"
              disabled>+47
            </option>
          </select>

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required pattern={validatePhone(phone) ? undefined : 'Invalid phone number'}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required pattern={validateEmail(email) ? undefined : 'Invalid email address'}
          />
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company Name"
          />
          <input
            type="text"
            value={vat}
            onChange={(e) => setVat(e.target.value)}
            placeholder="VAT Number"
            pattern={validateVat(vat) ? undefined : 'Invalid VAT number'}
          />
        </div>
      </form>
      <div className="payment-button">
        <button
          onClick={handlePayment}
          className="checkout_button">
          Continue to payment
        </button>
      </div>
    </div>

  );

};

export default AddressForm;

