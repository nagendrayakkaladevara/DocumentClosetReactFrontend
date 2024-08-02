import React, { useState, useEffect } from "react";
import '../Styless/Styles.css';
import InputField from "../Components/InputField";
import Text from "../Components/Text";
import Button from "../Components/Button";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../Firebase/SetUp';
import HomeScreen from "./HomeScreen";


const LoginScreen = () => {

    const [login, setLogin] = useState(true);

    const [signUpPage, setSignUpPage] = useState(false);
    const [signUpSucess, setSignUpSucess] = useState(false);
    const [signUpWarning, setSignUpWarning] = useState('');
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(true);


    const [formData, setFormData] = useState({
        name: '',
        number: '',
        password: ''
    });

    const handleSignUPInputChange = (event) => {
        setSignUpWarning('');
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation checks
        if (formData.name.trim() === '' || formData.number.trim() === '' || formData.password.trim() === '') {
            // alert('Please fill in all fields');
            setSignUpWarning('Please fill in all fields');
            return;
        }

        if (formData.number.length !== 10 || isNaN(formData.number)) {
            // alert('Mobile number should be exactly 10 digits');
            setSignUpWarning('Mobile number should be exactly 10 digits');
            return;
        }
        // console.log(formData, "formData");
        setLoading(true);
        try {
            const response = await fetch('https://documents-storage-app-backend.vercel.app/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Form data submitted successfully');
                setSignUpSucess(true);
                setLoading(false);
                setFormData({
                    name: '',
                    number: '',
                    password: ''
                })
            } else {
                console.error('Error submitting form data');
                setFormData({
                    name: '',
                    number: '',
                    password: ''
                })
                setLoading(false);
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
            setLoading(false)
        }
    };

    const handleBackLoginPage = () => {
        setSignUpPage(false);
        setSignUpSucess(false);
        setReload(!reload);
    }


    // ----------- login ----------

    const [inputValue, setInputValue] = useState('');

    const [OTPScreen, setOTPScreen] = useState(false);

    const [phoneNumbers, setPhoneNumber] = useState([]);
    const [loginWarning, setloginWarning] = useState('');
    const [sendingOTPAlert, setSendingOTPAlert] = useState(false);

    const [accountsData, setAccountsData] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://documents-storage-app-backend.vercel.app/accounts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setAccountsData(result);
                const extractedNumbers = result.map(item => item.number);
                setPhoneNumber(extractedNumbers);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [reload]);


    useEffect(() => {
        const storedPhoneNumber = localStorage.getItem('documentColloectionApp');

        console.log(storedPhoneNumber, "storedPhoneNumber");

        if (storedPhoneNumber !== null) {

            const numberCheck = phoneNumbers.includes(Number(storedPhoneNumber));

            if (numberCheck) {
                setLogin(false);
            }

            if (!numberCheck) {
                setLogin(true);
            }

            console.log(numberCheck, "numberCheck");
        }

        // if (phoneNumbers.includes(Number(storedPhoneNumber))) {
        //     console.log('Phone number is included in phoneNumbers array');
        //     setLogin(false);
        // } else {
        //     console.log('Phone number is not included in phoneNumbers array');
        //     setLogin(true);
        //     // localStorage.removeItem('documentColloectionApp');
        // }

    }, [phoneNumbers]);

    const handleInputChange = (event) => {
        setloginWarning('');
        setInputValue(event.target.value);
    };

    const handleOpenSignUpPage = () => {
        setloginWarning('');
        setSignUpPage(true);
    }

    console.log(inputValue, "inputValue");



    useEffect(() => {
        const getNameByNumber = (inputValue) => {
            // Convert inputValue to a number
            const phoneNumber = parseInt(inputValue, 10); // or Number(inputValue);

            const user = accountsData.find((entry) => entry.number === phoneNumber);
            return user ? user.name : null;
        };
        const storedPhoneNumber = localStorage.getItem('documentColloectionApp');

        const UserName = getNameByNumber((storedPhoneNumber === null) ? inputValue : storedPhoneNumber);

        setUserName(UserName);

    }, [inputValue, accountsData]);

    const phone = `+91${inputValue}`;

    const [userOtp, setUserOtp] = useState(null);


    const handleSendOTP = async () => {

        if (inputValue.length !== 10) {
            setloginWarning('Please enter valid Phone number!');
            // alert(10);
            return;
        }

        if (phoneNumbers.includes(Number(inputValue))) {
            // Number is enrolled
            console.log('Number is already enrolled');
            setSendingOTPAlert(true);
            setOTPScreen(true);

            // --- OTP ----

            try {
                const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {
                    'size': 'invisible',
                    'callback': (response) => {
                        console.log("reCAPTCHA solved, response:", response)
                    }
                })

                console.log(phone);
                const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
                setUserOtp(confirmation);
                console.log(confirmation);

            } catch (err) {
                console.error(err)
            }

        } else {
            // Number is not enrolled
            console.log('Number is not enrolled');
            setloginWarning('Please Create an account!');
        }
    }

    const [otp, setOtp] = useState('');

    const verifyOtp = async () => {
        try {
            const data = await userOtp.confirm(otp);

            console.log(data, "logged in");
            localStorage.setItem('documentColloectionApp', inputValue);
            setLogin(false);
        } catch (err) {
            console.error(err);
            alert('Requst Failed');
        }
    }
    console.log(document.getElementById('recaptcha'));

    const userPreveousLoginCheck = localStorage.getItem('documentColloectionApp');

    return (
        <>
            {/* --- login check --- */}
            <div id='recaptcha'></div>

            {login ? (<>

                {/* signUpPage check  */}
                {signUpPage ? (<>

                    {signUpSucess && (<div role="alert" className="alert alert-success" style={{ display: "flex", position: "absolute", margin: "10px", width: "95%" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Account created!</span>
                    </div>)}

                    {signUpWarning !== '' && (<>
                        <div role="alert" className="alert alert-warning" style={{ display: "flex", position: "absolute", margin: "10px", width: "95%" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span style={{ fontSize: "12px" }}>Warning: {signUpWarning}</span>
                            {/* <button class="btn btn-sm" onClick={() => setSignUpWarning('')}>Ok</button> */}
                        </div>
                    </>)}

                    {loading && (
                        <>
                            <div className="overlay">
                                <div className="overlay-content">
                                    <div class="SingUPloader"></div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="h-screen bg-white overflow-hidden flex justify-center items-center SVGBackground">
                        {!signUpSucess && (<>
                            <div className="h-2/5 w-fit p-4 flex justify-center items-center bgblurCustom" style={{ height: "fit-content" }} >
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <Text text='Sign Up' />
                                        <InputField
                                            label="Name"
                                            name="name"
                                            type="text"
                                            placeholder="Name.."
                                            value={formData.name}
                                            onChange={handleSignUPInputChange}
                                        />
                                        <InputField
                                            label="number"
                                            name="number"
                                            type="number"
                                            placeholder="Phone Number.."
                                            value={formData.number}
                                            onChange={handleSignUPInputChange}
                                        />
                                        <InputField
                                            label="Password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter Password.."
                                            value={formData.password}
                                            onChange={handleSignUPInputChange}
                                        />
                                    </div>
                                    {/* <Button type='button' text={'Create Account'} style={{ padding: "10px" }} /> */}
                                    <div className="flex justify-between">
                                        {/* <button type="submit">Submit</button> */}
                                        <Button type='submit' text={'Create Account'} style={{ padding: "10px" }} />
                                        <Button text='Back to login' onClick={() => setSignUpPage(false)} />
                                        {/* <button onClick={() => setSignUpPage(false)}>Back to Login</button> */}
                                    </div>

                                </form>
                            </div>
                        </>)}

                        {signUpSucess && <Button text='Login' onClick={handleBackLoginPage} />}

                    </div>

                </>) : (
                    <>
                        {/*--- loginpage --- */}

                        {loginWarning !== '' && (<>
                            <div role="alert" className="alert alert-warning" style={{ display: "flex", position: "absolute", margin: "10px", width: "95%" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span style={{ fontSize: "12px" }}>Warning: {loginWarning}</span>
                                {/* <button class="btn btn-sm" onClick={() => setSignUpWarning('')}>Ok</button> */}
                            </div>
                        </>)}

                        {sendingOTPAlert && (<>
                            <div role="alert" className="alert shadow-lg" style={{ display: "flex", position: "absolute", margin: "10px", width: "95%" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <div>
                                    <h3 className="font-bold">OTP message sent to {inputValue}!</h3>
                                    <div className="text-xs" style={{ fontSize: "13px" }}>You have 1 unread message &#x1F604;</div>
                                </div>
                            </div>
                        </>)}

                        <div className="h-screen bg-white overflow-hidden flex justify-center items-center SVGBackground">
                            <div className="h-2/5 w-fit p-4 flex justify-center items-center bgblurCustom" >
                                {!OTPScreen ? (<>
                                    <div>
                                        <Text text='Login' />
                                        <InputField
                                            label="Number"
                                            name='number'
                                            type="number"
                                            placeholder="Phone Number.."
                                            value={inputValue}
                                            onChange={(e) => handleInputChange(e)} />

                                        <div style={{ display: "none" }}>
                                            <PhoneInput
                                                country={"us"}
                                                value={inputValue}
                                                onChange={(inputField) => setInputValue("+" + inputField)}
                                                // onBlur={handleLoginCheck}
                                                placeholder="Phone Number.."
                                            />
                                        </div>

                                        <div className="flex justify-between">
                                            <Button text='Send OTP' style={{ background: "white", color: "black", fontSize: "12px", padding: "10px" }} onClick={handleSendOTP} />
                                            <Button text='Sign Up' onClick={handleOpenSignUpPage} style={{ fontSize: "12px", padding: "10px" }} />
                                        </div>
                                    </div>
                                </>) : (<>
                                    <div>
                                        <InputField
                                            label="Number"
                                            type="number"
                                            placeholder="OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)} />
                                        <Button text='Verify OTP' onClick={verifyOtp} />
                                    </div>
                                </>)}
                            </div>
                        </div>
                    </>
                )}


            </>) : (<>

                <HomeScreen user={userName} number={(localStorage.getItem('documentColloectionApp') === null) ? inputValue : localStorage.getItem('documentColloectionApp')} />

            </>)}

        </>
    )
}
export default LoginScreen;