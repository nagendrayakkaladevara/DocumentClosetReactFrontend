import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import UploadIcon from '../Asserts/Images/UploadIcon.png';

import CategoryAccordion from "../Components/CategorizedAccodaion";
import UploadForm from "../Components/UploadForm";


const HomeScreen = ({ user, number }) => {
    const [uploadForm, setUploadForm] = useState(false);

    const handleCloseInputForm = () => {
        setUploadForm(false);
    }

    return (
        <>
            <div className="HOMEScreenSection" style={{ height: "100vh" }}>

                {/* <div className="multiple-bg"></div> */}


                <Header loginedUser={user} />
                {uploadForm === false && <CategoryAccordion number={number}/>}
                <UploadForm uploadForm={uploadForm} handleCloseInputForm={handleCloseInputForm} number={number} user={user}/>


                {uploadForm === false && (
                    <div>
                        <button className="p-10 float-right" onClick={() => setUploadForm(true)}><img src={UploadIcon} style={{ width: '50px', height: '50px' }} /></button>
                    </div>
                )}

            </div>
        </>
    )
}
export default HomeScreen;