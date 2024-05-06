import React, { useState, useContext, useRef ,useEffect} from 'react';
import { UserContext } from "../../Context/userContext";
import './UserDashboard.css';
import Medo from '../Assets/Medo.png';
import { FaPlusCircle } from "react-icons/fa";
import axios from 'axios';
import formik, { useFormik } from 'formik';
import { ColorRing } from 'react-loader-spinner'
import Button from '../Button/Button';
import { editingschema, } from '../schemas/editingschema';

const UserDashboard = () => {

    const { user, forceupdate } = useContext(UserContext);

    console.log(user);

    const [Editprofile, setEditprofile] = useState(false);

    const switch_to_edit_mode = (e) => {
        e.preventDefault();
       
        console.log(user.username)
        console.log(user.email)
        setEditprofile(true)
    }

    const return_from_edit_mode = (e) => {
        e.preventDefault();
        setEditprofile(false)
    }

    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [loading, setloading] = useState(false);
    const [setimage, setsetimage] = useState(Medo);
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const [fileinputstate, setfileinputstate] = useState(null);

    const handelfielinput = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSelectedImage(reader.result)
        }
    }

    const handleImageUpload = async (values) => {
        console.log(selectedImage)
        console.log(values.username)
        console.log(values.email)
        setloading(true)
        try {
            const imageurl = axios.post('/Useruploadimage', {
                data: {
                    imageurl: selectedImage,
                    newusername: values.username,
                    newemail: values.email,
                    userid: user.id,
                    oldimage: user.image,
                    oldname: user.username,
                    oldemail: user.email
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(Response => {
                setsetimage(user.image)
                console.log(user.image)
                setEditprofile(false)
            })
        } catch (error) {
            console.log(error)
        }
        setloading(false)
        forceupdate();
    };

    const { values, errors, touched, handleChange, handleSubmit, handleBlur ,setValues} = useFormik({
        initialValues: {
            username: user ? user.username : "",
            email: user ? user.email : "",
        },
        validationSchema: editingschema,
        onSubmit: handleImageUpload,
    });

    useEffect(() => {
        setValues({
            username: user ? user.username : "",
            email: user ? user.email : "",
        });
    }, [user, setValues]);

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='DashContainer'>
                    <h1>Dashboard</h1>
                    <div className="Dashboard">
                        <div className="Dashboardleft">
                            <div className='userimage'>
                                <img src={user && user.image ? user.image : Medo} alt="User"></img>
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
                            {user ? (
                                <>
                                    <div className='username'>
                                        <h2>Username:</h2>
                                        {Editprofile ? <input id="username" value={values.username} onChange={handleChange} onBlur={handleBlur} /> : <h2><span>{user.username}</span></h2>}
                                        {errors.username && touched.username ? <span>{errors.username}</span> : <span></span>}
                                    </div>
                                    <div className='useremail'>
                                        <h2>Email:</h2>
                                        {Editprofile ? <input id="email" value={values.email} onChange={handleChange} /> : <h2><span>{user.email}</span></h2>}
                                        {errors.email && touched.email ? <span>{errors.email}</span> : <span></span>}
                                    </div>
                                </>
                            ) : (
                                <h2>Please log in</h2>
                            )}
                            <div className='buttons'>
                                {Editprofile ? <Button width="12dvw" height="5dvh" type='submit' text="Save changes" /> : <Button onClick={switch_to_edit_mode} width="12dvw" height="5dvh" text="Edit profile" type="button" />}
                                {Editprofile ? <Button color="white" backgroundColor="#780000" onClick={return_from_edit_mode} width="12dvw" height="5dvh" text="Cancel" type="button" /> : ""}
                            </div>
                        </div>
                        <div className="Dashboardright">
                            <h1>Your info</h1>
                            {/* Add additional user info here */}
                        </div>

                    </div>
                </div>
            </form>
            <ColorRing
                visible={loading}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
    );
};

export default UserDashboard;
