import React, { useState } from "react";
import Text from "../Components/Text";


const Header = ({ loginedUser }) => {

    const [viewProfile, setViewProfile] = useState(false);

    const handleLogOut = () => {

        localStorage.removeItem('documentColloectionApp');

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    return (
        <>
            <div >
                <div>
                    <p className="flex justify-center p-2 text-2xl font-semibold FontFamliy" style={{ color: "#ff6600" }}>DOCUMENT CLOSET</p>
                </div>
                <div className="flex justify-between p-1 pt-0">
                    <div className="m-1">
                        <p className="FontFamliy text-3xl font-semibold">Hello {loginedUser}!</p>
                    </div>
                    <div className="m-3 border-2 border-solid rounded-full hover:border-amber-600" onClick={() => setViewProfile(!viewProfile)}>
                        <button className="m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {viewProfile && (
                    <>
                        <div className="h-auto w-28 border-2 border-solid rounded-3 p-2 border-amber-600 absolute right-2 CustomBlur z-20">
                            <div>
                                {/* <div className="p-2 hover:bg-orange-400 rounded-md">
                                    <Text text='User' className='cursor-pointer' style={{ color: "white" }} />
                                </div> */}
                                {/* <div className="p-2  hover:bg-orange-400 rounded-md" >
                                    <Text text='Switch User' style={{ color: "white" }} />
                                </div> */}
                                <div className="p-2  hover:bg-orange-400 rounded-md" onClick={handleLogOut}>
                                    <Text text='Log Out' style={{ color: "black" }} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
export default Header;