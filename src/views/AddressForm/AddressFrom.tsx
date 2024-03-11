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

            const [countries, setCountries] = useState<Country[]>([
                { alpha2Code: 'DK', name: 'Denmark', code: '+45' },
                { alpha2Code: 'SE', name: 'Sweden', code: '+46' },
                { alpha2Code: 'NO', name: 'Norway', code: '+47' },
            ]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<Error | null>(null);
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

            return (
                <div className="form-address-card">
                    <h4 className="form-address-card-header">Delivery Address</h4>
                    <form className="form-card">
                        <div>
                                <input
                                    id="name"
                                    name="name"
                                    value={delivery.name}
                                    onChange={(e) => setDelivery({...delivery, name: e.target.value})}
                                    className="form-input-two"
                                    placeholder="Name"
                                />
                            <select
                                className="form-input-two"
                                value={delivery.country}
                                onChange={(e) => setDelivery({...delivery, country: e.target.value})}
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
                                onChange={(e) => handleZipChange(e, 'delivery')}
                                className="form-input-two"
                                placeholder="Zip Code"
                                
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
                                onChange={(e) => setDelivery({...delivery, address1: e.target.value})}
                                className="form-input"
                                placeholder="street name , number , etc" 
                            />
                        </div>
                        <div>
                            <label htmlFor="address2">Address 2</label>
                            <input
                                id="address2"
                                name="address2"
                                value={delivery.address2}
                                onChange={(e) => setDelivery({...delivery, address2: e.target.value})}
                                className="form-input"
                                placeholder="Apartment, suite, etc. (optional)"
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
                                    onChange={(e) => setDelivery({...delivery, phone: e.target.value})}
                                    className="form-input-phone"
                                    placeholder="Phone"
                                />
                           
                        </div>
                        <div>
                            <input
                                id="email"
                                name="email"
                                value={delivery.email}
                                onChange={(e) => setDelivery({...delivery, email: e.target.value})}
                                className="form-input"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <input
                                id="company"
                                name="company"
                                value={delivery.company}
                                onChange={(e) => setDelivery({...delivery, company: e.target.value})}
                                className="form-input-two"
                                placeholder="Company"
                            />
                       
                            <input
                                id="vat"
                                name="vat"
                                value={delivery.vat}
                                onChange={(e) => setDelivery({...delivery, vat: e.target.value})}
                                className="form-input-two"
                                placeholder="VAT"
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
                                        onChange={(e) => setBilling({...billing, name: e.target.value})}
                                        className="form-input-two"
                                        placeholder="Name"
                                    />

                                    <select
                                        id="country"
                                        name="country"
                                        value={billing.country}
                                        onChange={(e) => setBilling({...billing, country: e.target.value})}
                                        className="form-input-two"
                                        aria-placeholder="Country"
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
                                        onChange={(e) => handleZipChange(e, 'billing')}
                                        className="form-input-two"
                                        placeholder="Zip Code"
                                    />
                                    <input
                                        id="city"
                                        name="city"
                                        value={billing.city}
                                        onChange={(e) => setBilling({...billing, city: e.target.value})}
                                        className="form-input-two"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address1">Address 1</label>
                                    <input
                                        id="address1"
                                        name="address1"
                                        value={billing.address1}
                                        onChange={(e) => setBilling({...billing, address1: e.target.value})}
                                        className="form-input"
                                        placeholder="street name , number , etc"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address2">Address 2</label>
                                    <input
                                        id="address2"
                                        name="address2"
                                        value={billing.address2}
                                        onChange={(e) => setBilling({...billing, address2: e.target.value})}
                                        className="form-input"
                                        placeholder="Apartment, suite, etc. (optional)"
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
                                        onChange={(e) => setDelivery({...delivery, phone: e.target.value})}
                                        className="form-input-phone"
                                        placeholder="Phone"
                                    />

                                </div>
                                <div>
                                    <input
                                        id="email"
                                        name="email"
                                        value={billing.email}
                                        onChange={(e) => setBilling({...billing, email: e.target.value})}
                                        className="form-input"
                                        placeholder="Email"
                                    />
                                </div>
                                <div>
                                    <input
                                        id="company"
                                        name="company"
                                        value={billing.company}
                                        onChange={(e) => setBilling({...billing, company: e.target.value})}
                                        className="form-input-two"
                                        placeholder="Company"
                                    />

                                    <input
                                        id="vat"
                                        name="vat"
                                        value={billing.vat}
                                        onChange={(e) => setBilling({...billing, vat: e.target.value})}
                                        className="form-input-two"
                                        placeholder="VAT"
                                    />
                                </div>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="payment-button"
                        >
                            Continue to payment
                        </button>
                    </form>
                </div>
            );
        };


        export default AddressForm;

        
