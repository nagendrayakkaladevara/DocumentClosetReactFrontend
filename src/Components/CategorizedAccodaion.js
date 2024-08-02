import React, { useState, useEffect } from "react";
import Text from "./Text";
import InputField from "./InputField";
import Button from "./Button";
import DocumentImage from '../Asserts/Images/documentsimage.jpg';

const CategoryAccordion = ({ number }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedFilter, setRelatedFilter] = useState('');

    const [searchInput, setSearchInput] = useState('');

    const [selected, setSelected] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://documents-storage-app-backend.vercel.app/responce');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const [dataSelected, setDataSelected] = useState('');

    const filteredData = data && data.filter ? data.filter(item => item.related === number) : [];


    useEffect(() => {
        const filteredData = data && data.filter ? data.filter(item => item.related === number) : [];

        setDataSelected((filteredData.filter(item => item.category === selected)).filter(item =>
            item.title.toLowerCase().includes(searchInput.toLowerCase())
        ))
    }, [data, selected, searchInput])

    console.log(dataSelected, "dataselected");

    const jsonData = [
        { name: "Identities", length: filteredData.filter(item => item.category === 'Identities').length, id: 1 },
        { name: "Education", length: filteredData.filter(item => item.category === 'Education').length, id: 2 },
        { name: "Profession", length: filteredData.filter(item => item.category === 'Profession').length, id: 3 },
        { name: "Health", length: filteredData.filter(item => item.category === 'Health').length, id: 4 },
        { name: "Family", length: filteredData.filter(item => item.category === 'Family').length, id: 5 },
        { name: "Finance/Banking", length: filteredData.filter(item => item.category === 'Finance/Banking').length, id: 6 },
        { name: "Vehicle", length: filteredData.filter(item => item.category === 'Vehicle').length, id: 7 },
        { name: "Other", length: filteredData.filter(item => item.category === 'Other').length, id: 8 },
    ];

    const handleClick = (url) => {
        window.open(url, '_blank');
        console.log(url, "url");
    };

    function convertDateToDDMMYYYY(inputDate) {
        const date = new Date(inputDate);

        let day = date.getDate().toString();
        let month = (date.getMonth() + 1).toString(); // Month is 0-indexed
        let year = date.getFullYear().toString();

        // Add leading zeros if day or month is a single digit
        day = day.length === 1 ? '0' + day : day;
        month = month.length === 1 ? '0' + month : month;

        return `${day}-${month}-${year}`;
    }

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const [onRowHover, setOnRowHover] = useState(null);

    return (
        <>
            {selected === '' &&
                <div>
                    <ul className="p-0 border-solid border-black border-0 rounded-2xl m-4 ">
                        {jsonData.map(item => (
                            <li key={item.id} onMouseEnter={() => setOnRowHover(item.id)} onMouseLeave={() => setOnRowHover(null)} className="border-solid border-black border-1 m-2 rounded-md p-2 list-none flex justify-between cursor-pointer CustomBlur" onClick={() => setSelected(item.name)} style={{ border: "1px solid black", background:(onRowHover === item.id) ? '#ff6600' : 'white' }}>
                                <Text text={item.name} style={{ marginLeft: "10px", color: (onRowHover === item.id) ? "white" : "#ff6600"}} />
                                <div className={`mr-2 p-0.5 pl-3 pr-3 text-white rounded-full`} style={{background:(onRowHover === item.id) ? 'white' : '#ff6600'}}>
                                    <Text text={item.length} style={{ color: (onRowHover === item.id) ? "#ff6600" : "white", margin: "0px" }} />
                                </div>
                            </li>
                        ))}
                    </ul> 
                </div>
            }

            {selected !== '' &&
                <div>
                    <div>
                        <div className="flex justify-center">
                            <button className="btn btn-square m-2" title="Click to go back" onClick={() => setSelected('')}>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                                    <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                                    <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                                </svg>
                            </button>
                            <InputField type='text' text='search..' placeholder='Search..' value={searchInput} onChange={handleSearchChange} />
                        </div>
                        <div className="flex justify-evenly flex-wrap">
                            {dataSelected.map(item => (
                                <>
                                    <div key={item.id} class="card w-96 bg-base-100 shadow-xl image-full" style={{ margin: "10px" }}>
                                        <figure><img src={DocumentImage} style={{ width: "100px", height: "100px" }} /></figure>
                                        <div class="card-body">
                                            <h2 class="card-title">{item.title}</h2>
                                            <h6 className="card-subtitle">{item.category}</h6>
                                            <p>{item.description}</p>
                                            <div className="flex justify-around" style={{ fontSize: "8px", color: "white" }}>
                                                <a className="card-link flex gap-1 items-center text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" className="bi bi-cloud-upload" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                                        <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708z" />
                                                    </svg>
                                                    {convertDateToDDMMYYYY(item.createdAt)}</a>

                                                {/* <a className="card-link flex gap-1 items-center text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" className="bi bi-pencil" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                    </svg>
                                                    {convertDateToDDMMYYYY(item.updatedAt)}</a> */}
                                            </div>
                                            <div className="flex justify-between">
                                                <div class="card-actions">
                                                    <Button text='Delete' style={{ background: "red" }} />
                                                </div>
                                                <div class="card-actions">
                                                    <Button text='Open' onClick={() => handleClick(item.link)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}

                            {dataSelected.length === 0 && <p>No Records !!</p>} 

                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default CategoryAccordion;