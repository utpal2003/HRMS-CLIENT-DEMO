import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// Make sure this import matches your async thunk for adding a client
import { addClient } from '../../../redux/slices/clientSlice.js';
import { Country, State } from 'country-state-city';

const dialCodes = {
    AF: "+93", AL: "+355", DZ: "+213", AS: "+1-684", AD: "+376", AO: "+244", AR: "+54", AM: "+374",
    AU: "+61", AT: "+43", AZ: "+994", BH: "+973", BD: "+880", BY: "+375", BE: "+32", BJ: "+229",
    BT: "+975", BO: "+591", BA: "+387", BW: "+267", BR: "+55", BN: "+673", BG: "+359", BF: "+226",
    BI: "+257", KH: "+855", CM: "+237", CA: "+1", CV: "+238", CF: "+236", TD: "+235", CL: "+56",
    CN: "+86", CO: "+57", KM: "+269", CG: "+242", CR: "+506", CI: "+225", HR: "+385", CU: "+53",
    CY: "+357", CZ: "+420", DK: "+45", DJ: "+253", DO: "+1-809", EC: "+593", EG: "+20", SV: "+503",
    GQ: "+240", ER: "+291", EE: "+372", ET: "+251", FJ: "+679", FI: "+358", FR: "+33", GA: "+241",
    GM: "+220", GE: "+995", DE: "+49", GH: "+233", GR: "+30", GT: "+502", GN: "+224", GY: "+592",
    HT: "+509", HN: "+504", HU: "+36", IS: "+354", IN: "+91", ID: "+62", IR: "+98", IQ: "+964",
    IE: "+353", IL: "+972", IT: "+39", JM: "+1-876", JP: "+81", JO: "+962", KZ: "+7", KE: "+254",
    KI: "+686", KP: "+850", KR: "+82", KW: "+965", KG: "+996", LA: "+856", LV: "+371", LB: "+961",
    LS: "+266", LR: "+231", LY: "+218", LT: "+370", LU: "+352", MG: "+261", MW: "+265", MY: "+60",
    MV: "+960", ML: "+223", MT: "+356", MH: "+692", MR: "+222", MU: "+230", MX: "+52", MD: "+373",
    MC: "+377", MN: "+976", ME: "+382", MA: "+212", MZ: "+258", MM: "+95", NA: "+264", NP: "+977",
    NL: "+31", NZ: "+64", NI: "+505", NE: "+227", NG: "+234", NO: "+47", OM: "+968", PK: "+92",
    PW: "+680", PA: "+507", PG: "+675", PY: "+595", PE: "+51", PH: "+63", PL: "+48", PT: "+351",
    QA: "+974", RO: "+40", RU: "+7", RW: "+250", KN: "+1-869", LC: "+1-758", VC: "+1-784", WS: "+685",
    SM: "+378", SA: "+966", SN: "+221", RS: "+381", SC: "+248", SL: "+232", SG: "+65", SK: "+421",
    SI: "+386", SB: "+677", SO: "+252", ZA: "+27", ES: "+34", LK: "+94", SD: "+249", SR: "+597",
    SE: "+46", CH: "+41", SY: "+963", TW: "+886", TJ: "+992", TZ: "+255", TH: "+66", TG: "+228",
    TO: "+676", TT: "+1-868", TN: "+216", TR: "+90", TM: "+993", UG: "+256", UA: "+380", AE: "+971",
    GB: "+44", US: "+1", UY: "+598", UZ: "+998", VU: "+678", VE: "+58", VN: "+84", YE: "+967",
    ZM: "+260", ZW: "+263"
};

// Helper function to generate a new empty form state
const createInitialFormData = () => {
    const uniqueId = `IGCLNT-${nanoid(8).toUpperCase()}`;
    return {
        id: uniqueId,
        date: new Date().toISOString().split('T')[0],
        title: '', firstName: '', lastName: '',
        companyName: '', customerType: '', email: '', phone: '',
        country: '', state: '', city: '', addressLine1: '', addressLine2: '', zip: '',
        logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(uniqueId)}&background=random&size=128`,
        gstNo: '', msmeNo: '',
        billingAddressLine1: '', billingAddressLine2: '', billingCity: '', billingState: '', billingCountry: '', billingZip: '',
    };
};

const AddClientForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(createInitialFormData);
    const [availableCountries, setAvailableCountries] = useState([]);
    const [availableStates, setAvailableStates] = useState([]);
    const [availableBillingStates, setAvailableBillingStates] = useState([]);
    const [uploadedLogo, setUploadedLogo] = useState(null);
    const [sameAsOfficeAddress, setSameAsOfficeAddress] = useState(false);
    const [contactPersons, setContactPersons] = useState([{ name: '', phone: '', email: '' }]);
    const [uploadedDocuments, setUploadedDocuments] = useState({
        aadhar: null, pan: null, drivingLicense: null, passport: null
    });

    const customerTypes = ["Individual", "Business", "Vendor"];
    const titles = ["Mr.", "Ms.", "Mrs.", "Dr.", "Er.", "Prof."];

    useEffect(() => {
        const countries = Country.getAllCountries().map(c => ({ name: c.name, code: c.isoCode }));
        setAvailableCountries(countries);
    }, []);

    useEffect(() => {
        if (formData.country) {
            const states = State.getStatesOfCountry(formData.country).map(s => ({ name: s.name, code: s.isoCode }));
            setAvailableStates(states);
        } else {
            setAvailableStates([]);
        }
    }, [formData.country]);

    useEffect(() => {
        if (formData.billingCountry) {
            const states = State.getStatesOfCountry(formData.billingCountry).map(s => ({ name: s.name, code: s.isoCode }));
            setAvailableBillingStates(states);
        } else {
            setAvailableBillingStates([]);
        }
    }, [formData.billingCountry]);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;

        if (name === "logoUpload" && files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedLogo(reader.result);
                setFormData(prev => ({ ...prev, logoUrl: reader.result }));
            };
            reader.readAsDataURL(file);
            return;
        }

        if (name.startsWith('contactPerson-')) {
            const [_, field, indexStr] = name.split('-');
            const index = parseInt(indexStr, 10);
            const newContacts = [...contactPersons];
            newContacts[index][field] = value;
            setContactPersons(newContacts);
            return;
        }

        if (name.startsWith('document-')) {
            const docType = name.split('-')[1];
            if (files && files[0]) {
                const file = files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    setUploadedDocuments(prev => ({ ...prev, [docType]: reader.result }));
                };
                reader.readAsDataURL(file);
            }
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));

        if ((name === 'firstName' || name === 'lastName' || name === 'companyName') && !uploadedLogo) {
            const newFirstName = name === 'firstName' ? value : formData.firstName;
            const newLastName = name === 'lastName' ? value : formData.lastName;
            const newCompanyName = name === 'companyName' ? value : formData.companyName;

            let nameForAvatar = newCompanyName || `${newFirstName} ${newLastName}`.trim();
            if (!nameForAvatar) {
                nameForAvatar = formData.id;
            }

            setFormData(prev => ({
                ...prev,
                logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}&background=random&size=128`,
            }));
        }
    };

    const handleSameAddressChange = (e) => {
        const isChecked = e.target.checked;
        setSameAsOfficeAddress(isChecked);
        if (isChecked) {
            setFormData(prev => ({
                ...prev,
                billingAddressLine1: prev.addressLine1,
                billingAddressLine2: prev.addressLine2,
                billingCity: prev.city,
                billingState: prev.state,
                billingCountry: prev.country,
                billingZip: prev.zip,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                billingAddressLine1: '', billingAddressLine2: '', billingCity: '', billingState: '', billingCountry: '', billingZip: '',
            }));
        }
    };

    const handleAddContactPerson = () => {
        setContactPersons([...contactPersons, { name: '', phone: '', email: '' }]);
    };

    const handleRemoveContactPerson = (index) => {
        if (contactPersons.length > 1) {
            const newContacts = contactPersons.filter((_, i) => i !== index);
            setContactPersons(newContacts);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const clientName = `${formData.firstName} ${formData.lastName}`.trim();

        if (!clientName || !formData.companyName.trim() || !formData.customerType || !formData.email.trim() || !formData.phone.trim() || !formData.country || !formData.state || !formData.city.trim() || !formData.addressLine1.trim() || !formData.zip.trim()) {
            toast.error('Please fill in all required fields.', { position: 'top-center', theme: "colored" });
            return;
        }

        const officeAddress = {
            country: availableCountries.find(c => c.code === formData.country)?.name || '',
            state: availableStates.find(s => s.code === formData.state)?.name || '',
            city: formData.city.trim(),
            fullAddress: `${formData.addressLine1.trim()}${formData.addressLine2 ? ', ' + formData.addressLine2.trim() : ''}`,
            zip: formData.zip.trim(),
        };

        const billingAddress = {
            country: availableCountries.find(c => c.code === formData.billingCountry)?.name || '',
            state: availableBillingStates.find(s => s.code === formData.billingState)?.name || '',
            city: formData.billingCity.trim(),
            fullAddress: `${formData.billingAddressLine1.trim()}${formData.billingAddressLine2 ? ', ' + formData.billingAddressLine2.trim() : ''}`,
            zip: formData.billingZip.trim(),
        };

        const newClient = {
            id: formData.id,
            date: formData.date,
            title: formData.title,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            clientName,
            companyName: formData.companyName.trim(),
            customerType: formData.customerType,
            logoUrl: formData.logoUrl,
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            gstNo: formData.gstNo.trim(),
            msmeNo: formData.msmeNo.trim(),
            officeAddress,
            billingAddress,
            contactPersons,
            uploadedDocuments,
            billing: { totalBilled: 0, totalReceived: 0, totalDue: 0 },
            orders: [],
            transactions: [],
        };

        dispatch(addClient(newClient));
        toast.success('Client added successfully!', { position: 'top-center', theme: "colored" });

        // Reset the form to its initial state for a new entry
        setFormData(createInitialFormData());
        setUploadedLogo(null);
        setSameAsOfficeAddress(false);
        setContactPersons([{ name: '', phone: '', email: '' }]);
        setUploadedDocuments({ aadhar: null, pan: null, drivingLicense: null, passport: null });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-[#fff7ed] dark:bg-gray-900 p-4 sm:p-6 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-6xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">Create New Client</h2>

                {/* Logo Section */}
                <div className="mb-6 flex flex-col items-center">
                    <label className="block text-md font-medium text-gray-700 mb-2 dark:text-gray-300">Company Logo</label>
                    <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        {formData.logoUrl ? (
                            <img src={formData.logoUrl} alt="Company Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400 dark:text-gray-500 text-sm">No Logo</span>
                        )}
                    </div>
                    <input
                        type="file" name="logoUpload" accept="image/*" onChange={handleChange}
                        className="block w-full max-w-xs text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600"
                    />
                </div>

                <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit} noValidate>
                    {/* Basic Info */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Client ID</label>
                        <input type="text" value={formData.id} disabled className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-400" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Customer Type *</label>
                        <select name="customerType" value={formData.customerType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-700 focus:ring-orange-500 focus:border-orange-500" required>
                            <option value="">Select Type</option>
                            {customerTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Title</label>
                        <select name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-700 focus:ring-orange-500 focus:border-orange-500">
                            <option value="">Select Title</option>
                            {titles.map((title) => <option key={title} value={title}>{title}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">First Name *</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" />
                    </div>

                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Business / Company Name *</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" required />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Phone No. *</label>
                        <div className="flex">
                            <span className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-r-0 border-gray-300 dark:border-gray-500 rounded-l-md text-gray-700 dark:text-white">
                                {formData.country && (
                                    <img src={`https://flagcdn.com/w20/${formData.country.toLowerCase()}.png`} alt={formData.country} className="w-5 h-auto mr-2" />
                                )}
                                {dialCodes[formData.country] || "+__"}
                            </span>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter number" className="w-full px-3 py-2 border border-gray-300 rounded-r-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" required />
                        </div>
                    </div>

                    {/* Office Address */}
                    <div className="md:col-span-3 mt-4 border-t dark:border-gray-600 pt-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Office Address</h3>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Country *</label>
                        <select name="country" value={formData.country} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-700 focus:ring-orange-500 focus:border-orange-500" required>
                            <option value="">Select Country</option>
                            {availableCountries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">State *</label>
                        <select name="state" value={formData.state} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-700 focus:ring-orange-500 focus:border-orange-500" required disabled={!formData.country}>
                            <option value="">Select State</option>
                            {availableStates.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">City *</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" required />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Address Line 1 *</label>
                        <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Street address, P.O. box, etc." className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Pin Code *</label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Pin Code" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" required />
                    </div>

                    <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Address Line 2</label>
                        <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Apartment, suite, unit, building, floor, etc. (Optional)" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" />
                    </div>

                    {/* Billing Address */}
                    <div className="md:col-span-3 mt-4 border-t dark:border-gray-600 pt-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Billing Address</h3>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="same-address" name="sameAsOfficeAddress" checked={sameAsOfficeAddress} onChange={handleSameAddressChange} className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500" />
                                <label htmlFor="same-address" className="text-sm font-medium text-gray-700 dark:text-gray-300">Same as Office Address</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Country *</label>
                        <select name="billingCountry" value={formData.billingCountry} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-700 disabled:bg-gray-200 dark:disabled:bg-gray-600" required disabled={sameAsOfficeAddress}>
                            <option value="">Select Country</option>
                            {availableCountries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">State *</label>
                        <select name="billingState" value={formData.billingState} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-700 disabled:bg-gray-200 dark:disabled:bg-gray-600" required disabled={sameAsOfficeAddress || !formData.billingCountry}>
                            <option value="">Select State</option>
                            {availableBillingStates.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">City *</label>
                        <input type="text" name="billingCity" value={formData.billingCity} onChange={handleChange} placeholder="City" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white disabled:bg-gray-200 dark:disabled:bg-gray-600" required disabled={sameAsOfficeAddress} />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Address Line 1 *</label>
                        <input type="text" name="billingAddressLine1" value={formData.billingAddressLine1} onChange={handleChange} placeholder="Address Line 1" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white disabled:bg-gray-200 dark:disabled:bg-gray-600" required disabled={sameAsOfficeAddress} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Pin Code *</label>
                        <input type="text" name="billingZip" value={formData.billingZip} onChange={handleChange} placeholder="Pin Code" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white disabled:bg-gray-200 dark:disabled:bg-gray-600" required disabled={sameAsOfficeAddress} />
                    </div>
                    <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Address Line-2</label>
                        <input type="text" name="billingAddressLine2" value={formData.billingAddressLine2} onChange={handleChange} placeholder="Address Line 2 (Optional)" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white disabled:bg-gray-200 dark:disabled:bg-gray-600" disabled={sameAsOfficeAddress} />
                    </div>

                    {/* Other Details */}
                    <div className="md:col-span-3 mt-4 border-t dark:border-gray-600 pt-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Other Details</h3>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">GST No.</label>
                        <input type="text" name="gstNo" value={formData.gstNo} onChange={handleChange} placeholder="GST Number" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">MSME No.</label>
                        <input type="text" name="msmeNo" value={formData.msmeNo} onChange={handleChange} placeholder="MSME Number" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:ring-orange-500 focus:border-orange-500" />
                    </div>

                    {/* Contact Persons */}
                    <div className="md:col-span-3 mt-4 border-t dark:border-gray-600 pt-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact Person(s)</h3>
                        {contactPersons.map((contact, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded-lg dark:border-gray-600 items-end">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Name</label>
                                    <input type="text" name={`contactPerson-name-${index}`} value={contact.name} onChange={handleChange} placeholder="Contact Name" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Phone</label>
                                    <input type="tel" name={`contactPerson-phone-${index}`} value={contact.phone} onChange={handleChange} placeholder="Contact Phone" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email</label>
                                    <input type="email" name={`contactPerson-email-${index}`} value={contact.email} onChange={handleChange} placeholder="Contact Email" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white" />
                                </div>
                                <button type="button" onClick={() => handleRemoveContactPerson(index)} disabled={contactPersons.length <= 1} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddContactPerson} className="bg-orange-100 text-orange-800 px-6 py-2 rounded-md border border-orange-300 hover:bg-orange-200 transition-colors duration-200">Add More Contacts</button>
                    </div>

                    {/* Document Uploads */}
                    <div className="md:col-span-3 mt-4 border-t dark:border-gray-600 pt-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white my-4">Document Uploads</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {['aadhar', 'pan', 'drivingLicense', 'passport'].map((docType) => (
                                <div key={docType}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300 capitalize">{docType.replace(/([A-Z])/g, ' $1')} Image</label>
                                    <input type="file" name={`document-${docType}`} accept="image/*" onChange={handleChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600" />
                                    {uploadedDocuments[docType] && (
                                        <div className="mt-2">
                                            <img src={uploadedDocuments[docType]} alt={`${docType} preview`} className="max-h-24 w-auto rounded-md border dark:border-gray-600" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="md:col-span-3 flex justify-end mt-8 pt-6 border-t dark:border-gray-600 space-x-4">
                        <button type="button" className="bg-white text-gray-700 px-6 py-2 rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors duration-200" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-orange-600 transition-colors duration-200">Create Client</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddClientForm;