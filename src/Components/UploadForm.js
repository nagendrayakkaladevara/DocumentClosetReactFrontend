import React, { useState, useEffect } from "react";
import InputField from "../Components/InputField";
import Button from "../Components/Button";

const UploadForm = ({ uploadForm, handleCloseInputForm, number, user }) => {

    const [documentTitle, setDocumentTitle] = useState('');
    const [documentDescription, setDocumentDescription] = useState('');
    const [documentLink, setDocumentLink] = useState('');
    const [documentCategory, setDocumentCategory] = useState('');
    const [documentRelated, setDocumentRelated] = useState('');


    const handleSubmit = async () => {
        const dataToSend = {
            title: documentTitle,
            description: documentDescription,
            link: documentLink,
            category: documentCategory,
            related: number
        };

        try {
            const response = await fetch('https://documents-storage-app-backend.vercel.app/responce', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                alert('Uploaded Successfully')

            }

            const responseData = await response.json();
            console.log(responseData);
            setDocumentTitle('');
            setDocumentDescription('');
            setDocumentLink('');
            setDocumentCategory('');
            setDocumentRelated('');
            handleCloseInputForm();
            // Handle response data
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <>
            {uploadForm && (
                <>
                    <div className="CustomPOPUPDevOverlay">
                        <div className="CustomPOPUPDevContent">
                            <InputField label="Title" type="text" placeholder="Document Title.." value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} />
                            <InputField label="Description" type="text" placeholder="Document Description.." value={documentDescription} onChange={(e) => setDocumentDescription(e.target.value)} />
                            <InputField label="Link" type="text" placeholder="Document Link.." value={documentLink} onChange={(e) => setDocumentLink(e.target.value)} />
                            <select name="category" id="category" value={documentCategory} onChange={(e) => setDocumentCategory(e.target.value)} style={{ width: "100%", height: "40px", borderRadius: "7px", padding: "10px" }}>
                                <option>Select category</option>
                                <option value="Identities">Identities</option>
                                <option value="Education">Education</option>
                                <option value="Profession">Profession</option>
                                <option value="Health">Health</option>
                                <option value="Family">Family</option>
                                <option value="Finance/Banking">Finance/Banking</option>
                                <option value="Vehicle">Vehicle</option>
                                <option value="Other">Other</option>
                            </select>
                            <InputField label="Related" type="text" placeholder="Document Related.." value={user} onChange={(e) => setDocumentRelated(e.target.value)} readonly={true} />
                            <hr />
                            <div className="flex justify-between">
                                <Button text='Submit' onClick={handleSubmit} style={{ padding: "10px" }} />
                                <Button text='Close' onClick={handleCloseInputForm} style={{ background: "red", padding: "10px" }} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
export default UploadForm;