import React, { useEffect, useState } from 'react'
import { getUser, postUser, patchUser, deleteUser } from '../services/User'
import './UserPage.css'

const MyUserPage = ({ userId }) => {
    const [ user, setUser ] = useState( { first_name: '', last_name: '', email: '', avatar: '' } );

    const [ userTitle, setUserTitle ] = useState( '' );

    const [ appResponse, setAppResponse ] = useState( '' );

        useEffect(() => {
            const getUserData = async () => {
                const res = await getUser( userId );
                if ( res ) {
                    setUser( res );
                    setUserTitle('Update User');
                } else {
                    setUser( Object );
                    setUserTitle('Create User');
                }
            };
            getUserData();
        }, [ userId ]);


    const isNullOrEmpty = ( str ) => {
        return str === '' || str === null;
    }

    // validate data
    const validateData = () => {

        if( isNullOrEmpty( user.first_name ) ) {
            return "Name is blank";
        }
        if( isNullOrEmpty( user.last_name ) ) {
            return "Last name is blank";
        }
        if( isNullOrEmpty( user.email ) ) {
            return "Email is blank";
        }
        if( isNullOrEmpty( user.avatar ) ) {
            return "Avatar is blank";
        }
        return null;
    };


    // post and patch user
    const handleSubmit = async (e) => {
        e.preventDefault();

        // return if a attrbute is null or empty
        const res = validateData();

        if ( !res ) {
            const userData = { 
                first_name: user.first_name, 
                last_name: user.last_name, 
                email: user.email, 
                avatar: user.avatar 
            };

            if ( userId > 0 ) {
                // I handle errors in the service class -> services/User.js
                const apiRes = await patchUser( userId, userData );
                setAppResponse( apiRes || 'Error updating user' )
            } else {
                // I handle errors in the service class -> services/User.js
                const apiRes = await postUser( userData );
                setAppResponse( apiRes || 'Error saving user' );
            }
        } else {
            setAppResponse( res );
        }
    };


    // delete user
    const handleDelete = async () => {
        
        // I handle errors in the service class -> services/User.js
        const apiRes = await deleteUser( userId );

        setAppResponse( apiRes || 'Error deleting user' );
    };


    return (
        <div className="d-flex justify-content-center align-items-center" >
            <div className="w-50 p-1 border rounded">
                <h2>{ userTitle }</h2>
                <form className="row g-3 p-2" onSubmit={ handleSubmit }>
                    <div>
                       <label className="visually-hidden" htmlFor="first-name">First Name: </label>
                        <input 
                            type="text" 
                            id="first-name" 
                            name="first-name" 
                            value={ user.first_name }
                            onChange={ (e) => setUser({ ...user, first_name: e.target.value }) }
                            placeholder="First Name"
                            className="form-control form-control-lg"
                        />
                    </div>
                    <div>
                        <label className="visually-hidden" htmlFor="last-name">Last Name: </label>
                        <input 
                            type="text" 
                            id="last-name" 
                            name="last-name" 
                            value={ user.last_name }
                            onChange={ (e) => setUser({ ...user, last_name: e.target.value }) }
                            placeholder="Last Name"
                            className="form-control form-control-lg"
                        />
                    </div>
                    <div>
                        <label className="visually-hidden" htmlFor="email">Email: </label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            value={ user.email }
                            onChange={ (e) => setUser({ ...user, email: e.target.value }) }
                            placeholder="Email"
                            className="form-control form-control-lg"
                        />
                    </div>
                    <div>
                        <label className="visually-hidden" htmlFor="avatar">Avatar: </label>
                        <input 
                            type="text" 
                            id="avatar" 
                            name="avatar" 
                            value={ user.avatar }
                            onChange={ (e) => setUser({ ...user, avatar: e.target.value }) }
                            placeholder="Avatar"
                            className="form-control form-control-lg"
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary mb-3 btn-lg btn-block">Submit</button>
                    </div>
                </form>

                {/* Buttons */}
                { userId > 0 &&
                    <div>
                        <button className="btn btn-danger mb-3 btn-lg btn-block" onClick={ handleDelete }>Delete</button>
                    </div>
                }

                {/* ApiRest Response */}
                <div>
                    <span>{ appResponse }</span>
                </div>
            </div>
        </div>
    );
};

export const UserPage = ( props ) => {
    return (
        <div>
            <MyUserPage userId={ props.userId } />
        </div>
    );
};