import React, { useState, useContext, useRef, useEffect } from 'react';
import './UserDashboard.css';
import Medo from '../Assets/Medo.jpg';
import { FaPlusCircle } from "react-icons/fa";
import axios from 'axios';
import formik, { useFormik } from 'formik';
import { ColorRing } from 'react-loader-spinner';
import Button from '../Button/Button';
import { editingschema } from '../schemas/editingschema';
import background from '../Assets/background.png';
import Assem from '../Assets/Assem.png';
import { useDispatch, useSelector } from 'react-redux';
import { register, resetUser, login, Logoutuser, editUser } from '../../redux/slices/authslice/authslice';
import { ViewAllListing, resetlist } from '../../redux/slices/listslice/listslice';
import { FaCar } from "react-icons/fa";
import { GiCarDoor, GiCarSeat } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import IButton from '../Button/Button';
import Popup from '../popup/popup';
import {DeleteListing } from '../../redux/slices/listslice/listslice';
const UserDashboard = () => {

    const dispatch = useDispatch();

    const { ListInfo, isLoding, isError, isSucces, message } = useSelector((state) => state.list);
    const { userInfo, isLodinglogin, isErrorlogin, isSucceslogin, messagelogin } = useSelector((state) => state.auth);
    const [Popupnotification1, setPopup1] = useState(false);
    const [Popupnotification2, setPopup2] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [loading, setloading] = useState(false);
    const [preivewimage, setpreivewimage] = useState(userInfo ? userInfo.image : Medo);
    const [Editprofile, setEditprofile] = useState(false);
    const [EditList, setEditList] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);

    const switch_to_edit_mode = (e) => {
        e.preventDefault();
        setEditprofile(true);
    };

    const return_from_edit_mode = (e) => {
        e.preventDefault();
        setpreivewimage(userInfo.image);
        setEditprofile(false);
    };

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
                setSelectedImage(reader.result);
            };
        }
    };

    useEffect(() => {
        if (isErrorlogin) {
            console.log(messagelogin);
        }
        if (isSucceslogin) {
            setloading(false);
            setEditprofile(false);
            dispatch(resetUser());
        }
    }, [userInfo, isErrorlogin, isSucceslogin, messagelogin]);

    const handleEditUser = async (values) => {
        setloading(true);
        const userData = {
            imageurl: selectedImage,
            newusername: values.username,
            newemail: values.email,
            userid: userInfo.id,
            oldimage: userInfo.image,
            oldname: userInfo.username,
            oldemail: userInfo.email,
        };

        try {
            await dispatch(editUser(userData));
            setPopup1(true);
        } catch (error) {
            console.error("Error editing user:", error);
        }

        if (isSucceslogin) {
            setloading(false);
            setEditprofile(false);
            dispatch(resetUser());
            setPopup1(true);
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

   
    if(!ListInfo){
        try {
            dispatch(ViewAllListing())
            //dispatch(getUserContacts(senderId))
        } catch (error) {
            console.error('Error fetching list info:', error);
        }
    }

    const handleShowEdit = async (list, listid) => {
        console.log(list._id)
        setSelectedListing(list);
        setEditList(true);
    };

    const handleEditList = async (values) => {

        const carName = values.carName
        const numberDoors = values.numberDoors
        const numberSeats = values.numberSeats
        const price = values.price
        const listid = values.id

        const Data = {
            carName,
            numberDoors,
            numberSeats,
            price,
            listid
        }
        await axios.post('/EditListingUser', Data)
        await dispatch(ViewAllListing())
        setEditList(false);
        setPopup1(true);
    };

    const Delete = async (_id) => {
        console.log(_id)
        try {
          const data = {
            _id
          }
          setloading(true);
          await dispatch(DeleteListing(data))
          setloading(false);
          setPopup2(true);
          await dispatch(ViewAllListing())
        } catch (error) {
          console.error('Delete failed medo is a loser :(', error);
        }
    }

    const listingFormik = useFormik({
        initialValues: {
            carName: selectedListing ? selectedListing.carName : "",
            numberDoors: selectedListing ? selectedListing.numDoors : "",
            numberSeats: selectedListing ? selectedListing.numSeats : "",
            price: selectedListing ? selectedListing.price : "",
            id: selectedListing ? selectedListing._id : "",
        },
        onSubmit: handleEditList,
    });

    useEffect(() => {
        if (selectedListing) {
            listingFormik.setValues({
                carName: selectedListing.carName,
                numberDoors: selectedListing.numDoors,
                numberSeats: selectedListing.numSeats,
                price: selectedListing.price,
                id: selectedListing ? selectedListing._id : "",
            });
        }
    }, [selectedListing, listingFormik.setValues]);

    return (
        <div>
            <Popup setPopup={setPopup1} trigger={Popupnotification1} text="Edited success" />
            <Popup setPopup={setPopup2} trigger={Popupnotification2} text="Delete Car Listing success" />
            <div className='DashContainer'>
                <img className='background' src={background} alt="Background" />
                <div className="Dashboard">
                    <div className="Dashboardleft">
                        <div className='userimage'>
                            <img src={preivewimage} alt="User" />
                        </div>
                        {Editprofile && (
                            <input
                                className='imageupload'
                                id='imageUserupload'
                                name="file"
                                type="file"
                                accept="image/*"
                                value={fileinputstate}
                                style={{ display: "block" }}
                                onChange={handelfielinput}
                            />
                        )}
                        {userInfo ? (
                            <>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className='username'>
                                        <h2>Username:</h2>
                                        {Editprofile ? (
                                            <input
                                                id="username"
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        ) : (
                                            <h2><span>{userInfo.username}</span></h2>
                                        )}
                                        {errors.username && touched.username && <span>{errors.username}</span>}
                                    </div>
                                    <div className='useremail'>
                                        <h2>Email:</h2>
                                        {Editprofile ? (
                                            <input
                                                id="email"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            <h2><span>{userInfo.email}</span></h2>
                                        )}
                                        {errors.email && touched.email && <span>{errors.email}</span>}
                                    </div>
                                    <div className='buttons'>
                                        {Editprofile ? (
                                            <Button width="12dvw" height="5dvh" type='submit' text="Save changes" />
                                        ) : (
                                            <Button onClick={switch_to_edit_mode} width="12dvw" height="5dvh" text="Edit profile" type="button" />
                                        )}
                                        {Editprofile && (
                                            <Button
                                                color="white"
                                                backgroundColor="#780000"
                                                onClick={return_from_edit_mode}
                                                width="12dvw"
                                                height="5dvh"
                                                text="Cancel"
                                                type="button"
                                            />
                                        )}
                                    </div>
                                </form>
                            </>
                        ) : (
                            <h2>Please log in first to show profile</h2>
                        )}
                    </div>
                    {userInfo && (
                        <div className="Dashboardright">
                            <h1 className='h1youlistings'>Your Listings</h1>
                            <div className='UserListing'>
                                {ListInfo && ListInfo.filter(list => list.userId === userInfo.id).map(filteredItem => (
                                    <div className='Listing' key={filteredItem.id}>
                                        <div className="ListingPictures">
                                            <img className="firstPic" src={filteredItem.image1} alt="Thumbnail 1" />
                                        </div>
                                        <div className='ListingName'>
                                            <h3>{filteredItem.carName}</h3>
                                        </div>
                                        <div className='ListingButtons'>
                                            <IButton
                                                margintop="2.5dvh"
                                                backgroundColor="#9f0606"
                                                text="Delete"
                                                width="15dvh"
                                                height="5dvh"
                                                id="Lbutton"
                                                onClick={() => { Delete(filteredItem._id) }}
                                            />
                                            <IButton
                                                margintop="2.5dvh"
                                                backgroundColor="#C2C8C8"
                                                text="Edit"
                                                width="15dvh"
                                                height="5dvh"
                                                id="Lbutton"
                                                onClick={() => { handleShowEdit(filteredItem, filteredItem._id) }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {EditList && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => { setEditList(false); }}>&times;</span>
                        <h2>Edit Listing</h2>
                        <form onSubmit={listingFormik.handleSubmit}>
                            <label>
                                Car Name:
                                <input
                                    type="text"
                                    name="carName"
                                    value={listingFormik.values.carName}
                                    onChange={listingFormik.handleChange}
                                    onBlur={listingFormik.handleBlur}
                                />
                            </label>
                            {listingFormik.errors.carName && listingFormik.touched.carName && <span>{listingFormik.errors.carName}</span>}
                            <label>
                                Number of Doors:
                                <input
                                    type="number"
                                    name="numberDoors"
                                    value={listingFormik.values.numberDoors}
                                    onChange={listingFormik.handleChange}
                                    onBlur={listingFormik.handleBlur}
                                />
                            </label>
                            {listingFormik.errors.numberDoors && listingFormik.touched.numberDoors && <span>{listingFormik.errors.numberDoors}</span>}
                            <label>
                                Number of Seats:
                                <input
                                    type="number"
                                    name="numberSeats"
                                    value={listingFormik.values.numberSeats}
                                    onChange={listingFormik.handleChange}
                                    onBlur={listingFormik.handleBlur}
                                />
                            </label>
                            {listingFormik.errors.numberSeats && listingFormik.touched.numberSeats && <span>{listingFormik.errors.numberSeats}</span>}
                            <label>
                                Price:
                                <input
                                    type="text"
                                    name="price"
                                    value={listingFormik.values.price}
                                    onChange={listingFormik.handleChange}
                                    onBlur={listingFormik.handleBlur}
                                />
                            </label>
                            {listingFormik.errors.price && listingFormik.touched.price && <span>{listingFormik.errors.price}</span>}
                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            )}
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