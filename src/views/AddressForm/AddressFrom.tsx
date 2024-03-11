        import React, { useState, useEffect } from 'react';

        interface Country {
            alpha2Code: string;
            name: string;
            code: string;
        }
      
        
        interface Address {
          country: string;
          zip: string;
          city: string;
          address1: string;
          address2: string;
          name: string;
          phone: string;
          email: string;
          company: string;
          vat: string;
          countryCode: string;
        }
        
        interface AddressFormState {
          delivery: Address;
          billing: Address;
          isBillingDifferent: boolean;
        }

        

        const AddressForm: React.FC = () => {
        
        const [delivery, setDelivery] = useState<Address>({
          country: 'Denmark',
          zip: '',
          city: '',
          address1: '',
          address2: '',
          name: '',
          phone: '',
          email: '',
          company: '',
          vat: '',
          countryCode: '',
        });
        
        
        const [billing, setBilling] = useState<Address>({
          country: 'Denmark',
          zip: '',
          city: '',
          address1: '',
          address2: '',
          name: '',
          phone: '',
          email: '',
          company: '',
          vat: '',
          countryCode: '',
        });
          
        const [isBillingDifferent, setIsBillingDifferent] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [countries, setCountries] = useState<Country[]>([
                { alpha2Code: 'DK', name: 'Denmark', code: '+45' },
                { alpha2Code: 'SE', name: 'Sweden', code: '+46' },
                { alpha2Code: 'NO', name: 'Norway', code: '+47' },
            ]);
       
        const [fullPhone, setFullPhone] = useState('');

            useEffect(() => {
                const selectedCountry = countries.find(country => country.name === delivery.country);
                if (selectedCountry) {
                    setFullPhone(`${selectedCountry.code} ${delivery.phone}`);
                }
                
            }, [delivery.country, delivery.phone, countries]);

            async function fetchZip() {
                if (delivery.country === 'Denmark') {
                    const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${delivery.zip}`);
                    const data = await response.json();
                    setDelivery({...delivery, city: data.navn});
                }

                if (billing.country === 'Denmark') {
                    const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${billing.zip}`);
                    const data = await response.json();
                    setBilling({...billing, city: data.navn});
                }
            }
            
          const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
                    const zip = e.target.value;
                    if (type === 'delivery') {
                        setDelivery({...delivery, zip});
                    } else {
                        setBilling({...billing, zip});
                    }
              await fetchZip();
                }

            function validatePhoneNumber(phone: string, country: string): boolean {
                if (country === 'Denmark') {
                    const regex = /^\d{8}$/;
                    return regex.test(phone);
                }
                return true;
            }

            function validateEmail(email: string): boolean {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(email);
            }


            function validateVAT(vat: string, country: string): boolean {
                if (country === 'Denmark') {
                    const regex = /^\d{8}$/;
                    return regex.test(vat);
                }
                return true;
            }

            const handlePayment = (e: React.FormEvent) => {
                e.preventDefault();
                if (!delivery.name) {
                    setError('Name is required');
                    return;
                }
                if (!delivery.zip) {
                    setError('Zip is required');
                    return;
                }
                if (!delivery.city) {
                    setError('City is required');
                    return;
                }
                if (!delivery.address1) {
                    setError('Address1 is required');
                    return;
                }
                if (!delivery.phone) {
                    setError('Phone is required');
                    return;
                }
                if (!delivery.email) {
                    setError('Email is required');
                    return;
                }
                
                if (!validatePhoneNumber(delivery.phone, delivery.country)) {
                    setError('Invalid phone number');
                    return;
                }
                if (!validateEmail(delivery.email)) {
                    setError('Invalid email');
                    return;
                }
                if (delivery.country === 'Denmark' && !validateVAT(delivery.vat, delivery.country)) {
                    setError('Invalid VAT');
                    return;
                }
                if (isBillingDifferent) {
                    if (!billing.name) {
                        setError('Name is required');
                        return;
                    }
                    if (!billing.zip) {
                        setError('Zip is required');
                        return;
                    }
                    if (!billing.city) {
                        setError('City is required');
                        return;
                    }
                    if (!billing.address1) {
                        setError('Address1 is required');
                        return;
                    }
                    if (!billing.phone) {
                        setError('Phone is required');
                        return;
                    }
                    if (!billing.email) {
                        setError('Email is required');
                        return;
                    }
                    if (!validatePhoneNumber(billing.phone, billing.country)) {
                        setError('Invalid phone number');
                        return;
                    }
                    if (!validateEmail(billing.email)) {
                        setError('Invalid email');
                        return;
                    }
                    if (billing.country === 'Denmark' && !validateVAT(billing.vat, billing.country)) {
                        setError('Invalid VAT');
                        return;
                    }
                }
                setError(null);
                    window.location.href = '/Payment';
                
            };


            return (
                <div className="form-address-card">
                    <h4 className="form-address-card-header">Delivery Address</h4>
                    <form className="form-card">
                        <div>
                                <input
                                    id="name"
                                    name="name"
                                    value={delivery.name}
                                    className="form-input-two"
                                    placeholder="Name"
                                    onChange={(e) => 
                                        setDelivery({...delivery, name: e.target.value})}
                                />
                            <select
                                className="form-input-two"
                                value={delivery.country}
                                onChange={(e) => 
                                    setDelivery({...delivery, country: e.target.value})}
                            >
                                {countries.map((country) => (
                                    <option
                                        key={country.alpha2Code}
                                        value={country.name}
                                        disabled={country.name === 'Sweden' || country.name === 'Norway'}
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={delivery.zip}
                                className="form-input-two"
                                placeholder="Zip Code"
                                onChange={(e) => 
                                    handleZipChange(e, 'delivery')}
                                
                            />
                            <input
                                type="text"
                                value={delivery.city}
                                disabled
                                placeholder="City"
                                className="form-input-two"
                            />
                        </div>
                        <div>
                            <label htmlFor="address1">Address 1</label>
                            <input
                                id="address1"
                                name="address1"
                                value={delivery.address1}
                                className="form-input"
                                placeholder="street name , number , etc"
                                onChange={(e) =>
                                    setDelivery({...delivery, address1: e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="address2">Address 2</label>
                            <input
                                id="address2"
                                name="address2"
                                value={delivery.address2}
                                className="form-input"
                                placeholder="Apartment, suite, etc. (optional)"
                                onChange={(e) => 
                                    setDelivery({...delivery, address2: e.target.value})}
                            />
                        </div>
                       
                        <div>
                            <input
                                id="fullPhone"
                                name="fullPhone"
                                value={fullPhone}
                                readOnly
                                className="form-input-code"
                            />
                            
                                <input
                                    id="phone"
                                    name="phone"
                                    value={delivery.phone}
                                    className="form-input-phone"
                                    placeholder="Phone"
                                    onChange={(e) =>
                                        setDelivery({...delivery, phone: e.target.value})}
                                />
                           
                        </div>
                        <div>
                            <input
                                id="email"
                                name="email"
                                value={delivery.email}
                                className="form-input"
                                placeholder="Email"
                                onChange={(e) =>
                                    setDelivery({...delivery, email: e.target.value})}
                            />
                        </div>
                        <div>
                            <input
                                id="company"
                                name="company"
                                value={delivery.company}
                                className="form-input-two"
                                placeholder="Company"
                                onChange={(e) =>
                                    setDelivery({...delivery, company: e.target.value})}
                            />
                       
                            <input
                                id="vat"
                                name="vat"
                                value={delivery.vat}
                                className="form-input-two"
                                placeholder="VAT"
                                onChange={(e) =>
                                    setDelivery({...delivery, vat: e.target.value})}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="isBillingDifferent"
                                style={{
                                    marginRight: '10px',
                                    marginTop: '20px',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: 'red'
                                }}
                            >
                                Is billing address different?
                            </label>

                            <input
                                id="isBillingDifferent"
                                name="isBillingDifferent"
                                type="checkbox"
                                checked={isBillingDifferent}
                                onChange={() => setIsBillingDifferent(!isBillingDifferent)}
                            />
                        </div>
                        <br></br>
                        {isBillingDifferent && (
                            <div>
                                <h4>Billing address </h4>
                                <br></br>
                                <div>
                                    <input
                                        id="name"
                                        name="name"
                                        value={billing.name}
                                        className="form-input-two"
                                        placeholder="Name"
                                        onChange={(e) =>
                                            setBilling({...billing, name: e.target.value})}
                                    />

                                    <select
                                        id="country"
                                        name="country"
                                        value={billing.country}
                                        className="form-input-two"
                                        aria-placeholder="Country"
                                        onChange={(e) =>
                                            setBilling({...billing, country: e.target.value})}
                                    >
                                        {countries.map((country) => (
                                            <option key={country.alpha2Code} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                <div>

                                    <input
                                        id="zip"
                                        name="zip"
                                        value={billing.zip}
                                        className="form-input-two"
                                        placeholder="Zip Code"
                                        onChange={(e) =>
                                            handleZipChange(e, 'billing')}
                                    />
                                    <input
                                        id="city"
                                        name="city"
                                        value={billing.city}
                                        className="form-input-two"
                                        placeholder="City"
                                        onChange={(e) =>
                                            setBilling({...billing, city: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address1">Address 1</label>
                                    <input
                                        id="address1"
                                        name="address1"
                                        value={billing.address1}
                                        className="form-input"
                                        placeholder="street name , number , etc"
                                        onChange={(e) =>
                                            setBilling({...billing, address1: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address2">Address 2</label>
                                    <input
                                        id="address2"
                                        name="address2"
                                        value={billing.address2}
                                        className="form-input"
                                        placeholder="Apartment, suite, etc. (optional)"
                                        onChange={(e) =>
                                            setBilling({...billing, address2: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <input
                                        id="fullPhone"
                                        name="fullPhone"
                                        value={fullPhone}
                                        readOnly
                                        className="form-input-code"
                                        placeholder="Phone"
                                    />
                                    <input
                                        id="phone"
                                        name="phone"
                                        value={billing.phone}
                                        className="form-input-phone"
                                        placeholder="Phone"
                                        onChange={(e) => 
                                            setBilling({...billing, phone: e.target.value})}
                                    />
                                   

                                </div>
                                <div>
                                    <input
                                        id="email"
                                        name="email"
                                        value={billing.email}
                                        className="form-input"
                                        placeholder="Email"
                                        onChange={(e) =>
                                            setBilling({...billing, email: e.target.value})}
                                    />
                                    
                                </div>
                                <div>
                                    <input
                                        id="company"
                                        name="company"
                                        value={billing.company}
                                        className="form-input-two"
                                        placeholder="Company"
                                        onChange={(e) =>
                                            setBilling({...billing, company: e.target.value})}
                                    />

                                    <input
                                        id="vat"
                                        name="vat"
                                        value={billing.vat}
                                        className="form-input-two"
                                        placeholder="VAT"
                                        onChange={(e) =>
                                            setBilling({...billing, vat: e.target.value})}
                                    />
                                    {error && error.includes('vat') && (
                                        <p style={{ color: 'red' }}>{error}</p>
                                    )}
                                 
                                </div>
                              
                            </div>
                        )}
                    </form>
                    <div  className="payment-button">
                        {error && (
                            <div>
                                <p style={{ color: 'red' }}>{error}</p>
                            </div>
                        )}
                        <button
                            type="submit"
                            onClick={handlePayment}
                        >
                            Continue to payment
                        </button>
                    </div>
                  
                </div>
            );
        };


        export default AddressForm;

        
