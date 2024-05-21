import React, { useState, useContext, useRef, useEffect } from 'react';
import './UserDashboard.css';
import Medo from '../Assets/Medo.jpg';
import { FaPlusCircle } from "react-icons/fa";
import axios from 'axios';
import formik, { useFormik } from 'formik';
import { ColorRing } from 'react-loader-spinner'
import Button from '../Button/Button';
import { editingschema, } from '../schemas/editingschema';
import background from '../Assets/background.png';
import Assem from '../Assets/Assem.png';
import { useDispatch, useSelector } from 'react-redux';
import { register, resetUser, login, Logoutuser, editUser } from '../../redux/slices/authslice/authslice';
import { ViewAllListing, resetlist } from '../../redux/slices/listslice/listslice';
import { FaCar } from "react-icons/fa";
import { GiCarDoor, GiCarSeat } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import IButton from '../Button/Button'

const UserDashboard = () => {

    const dispatch = useDispatch();
    const { ListInfo, isLoding, isError, isSucces, message } = useSelector((state) => state.list)
    const { userInfo, isLodinglogin, isErrorlogin, isSucceslogin, messagelogin } = useSelector((state) => state.auth)

    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [loading, setloading] = useState(false);
    const [preivewimage, setpreivewimage] = useState(userInfo ? userInfo.image : Medo);
    const [Editprofile, setEditprofile] = useState(false);

    const switch_to_edit_mode = (e) => {
        e.preventDefault();

        console.log(userInfo.username)
        console.log(userInfo.email)
        setEditprofile(true)
    }
    const return_from_edit_mode = (e) => {
        e.preventDefault();
        setpreivewimage(userInfo.image);
        setEditprofile(false)
    }

    useEffect(() => {
        if (userInfo) {
            setpreivewimage(userInfo.image);
        } else {
            setpreivewimage(Medo);
        }
    }, [userInfo]);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const [fileinputstate, setfileinputstate] = useState(null);

    const handelfielinput = (e) => {
        const file = e.target.files[0];
        if (file) {
            setpreivewimage(URL.createObjectURL(file));
            setSelectedImage(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSelectedImage(reader.result)
            }
        }
    }

    useEffect(() => {
        if (isErrorlogin) {

            console.log(messagelogin);

        }
        if (isSucceslogin) {
            setloading(false)
            setEditprofile(false)
            dispatch(resetUser())
        }
    }, [userInfo, isErrorlogin, isSucceslogin, messagelogin])

    const handleEditUser = async (values) => {

        console.log(selectedImage)
        console.log(values.username)
        console.log(values.email)
        setloading(true)

        const userData = {
            imageurl: selectedImage,
            newusername: values.username,
            newemail: values.email,
            userid: userInfo.id,
            oldimage: userInfo.image,
            oldname: userInfo.username,
            oldemail: userInfo.email
        }

        try {
            await dispatch(editUser(userData))
        } catch (error) {
            console.error("Error editing user:", error);
            // Handle the error appropriately, e.g., show an error message to the user
        }

        if (isSucceslogin) {
            setloading(false)
            setEditprofile(false)
            dispatch(resetUser())
        }
    };

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setValues } = useFormik({
        initialValues: {
            username: userInfo ? userInfo.username : "",
            email: userInfo ? userInfo.email : "",
        },
        validationSchema: editingschema,
        onSubmit: handleEditUser,
    });

    useEffect(() => {
        setValues({
            username: userInfo ? userInfo.username : "",
            email: userInfo ? userInfo.email : "",
        });
    }, [userInfo, setValues]);

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='DashContainer'>
                    <img className='background' src={background} />
                    <div className="Dashboard">
                        <div className="Dashboardleft">
                            <div className='userimage'>
                                <img src={preivewimage} alt="User"></img>
                            </div>
                            {Editprofile ?
                                <input
                                    className='imageupload'
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    value={fileinputstate}
                                    style={{ display: "block" }}
                                    onChange={handelfielinput}
                                />
                                :
                                ""
                            }
                            {userInfo ? (
                                <>

                                    <div className='username'>
                                        <h2>Username:</h2>
                                        {Editprofile ? <input id="username" value={values.username} onChange={handleChange} onBlur={handleBlur} /> : <h2><span>{userInfo.username}</span></h2>}
                                        {errors.username && touched.username ? <span>{errors.username}</span> : <span></span>}
                                    </div>
                                    <div className='useremail'>
                                        <h2>Email:</h2>
                                        {Editprofile ? <input id="email" value={values.email} onChange={handleChange} /> : <h2><span>{userInfo.email}</span></h2>}
                                        {errors.email && touched.email ? <span>{errors.email}</span> : <span></span>}
                                    </div>
                                    <div className='buttons'>
                                        {Editprofile ? <Button width="12dvw" height="5dvh" type='submit' text="Save changes" /> : <Button onClick={switch_to_edit_mode} width="12dvw" height="5dvh" text="Edit profile" type="button" />}
                                        {Editprofile ? <Button color="white" backgroundColor="#780000" onClick={return_from_edit_mode} width="12dvw" height="5dvh" text="Cancel" type="button" /> : ""}
                                    </div>
                                </>

                            ) : (
                                <h2>Please log in first to show profile</h2>
                            )}

                        </div>
                        {userInfo ? (
                            <div className="Dashboardright">
                                <h1 className='h1youlistings'>Your Listings</h1>
                                <div className='UserListing'>
                                    {ListInfo && ListInfo.filter(list => list.userId === userInfo.id).map(filteredItem => (
                                        <div className='Listing'>
                                            <div className="ListingPictures">
                                                <img className="firstPic" src={filteredItem.image1} alt="Thumbnail 1" />
                                            </div>
                                            <div className='ListingName'>
                                                <h3>{filteredItem.carName}</h3>
                                            </div>
                                            <div className='ListingButtons'>
                                                <IButton margintop="2.5dvh" backgroundColor="#9f0606" text="Delete" width="15dvh" height="5dvh" id="Lbutton"></IButton>
                                                <IButton margintop="2.5dvh" backgroundColor="#C2C8C8" text="Edit" width="15dvh" height="5dvh" id="Lbutton"></IButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </form>
            <div className="loader-container">
                <ColorRing
                    visible={loading}
                    height="80"
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#2192FF', '#F5EDED', '#2192FF', '#F5EDED', '#2192FF']}
                    className="loader"
                />
            </div>
        </div>
    );
};

export default UserDashboard;