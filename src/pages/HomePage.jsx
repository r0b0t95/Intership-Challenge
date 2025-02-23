import React, { useState } from 'react'
import { UsersPage } from './UsersPage'
import { UserPage } from './UserPage'
import './HomePage.css'

const MyHomePage = () => {
    const [ selectedUserId, setSelectedUserId ] = useState( 0 );
    const [ userLogin, setUserLogin ] = useState( { user_name: '', password: '' } );
    const [ step, setStep ] = useState( 0 );

    // handle login
    const handleLogin = (e) => {
        e.preventDefault(e);
        if ( userLogin.user_name === 'robert' && userLogin.password === 'intership' ) {
            setStep( 1 );
        } else {
            alert('Invalid login');
        }
    }

    // change pages
    const nextStep = () => {
        setStep( 2 );
    }

    const prevStep = () => {
        setSelectedUserId( 0 );
        setStep( 1 );
    }

    const addUser = () => {
        setSelectedUserId( 0 );
        setStep( 2 );
    }

    return (
        <div>
            { step === 0 && 
                <>
                    <form className="row g-3 p-2" onSubmit={ handleLogin }>
                        <div>
                            <label className="visually-hidden" htmlFor="user-name">User Name: </label>
                            <input 
                                type="text" 
                                id="user-name" 
                                name="user-name" 
                                onChange={ (e) => setUserLogin({ ...userLogin, user_name: e.target.value }) }
                                placeholder="User Name"
                                className="form-control form-control-lg"
                            />
                        </div>
                        <div>
                            <label className="visually-hidden" htmlFor="password">Password: </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                onChange={ (e) => setUserLogin({ ...userLogin, password: e.target.value }) }
                                placeholder="Password"
                                className="form-control form-control-lg"
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary mb-3 btn-lg btn-block">Login</button>
                        </div>
                    </form>
                </>
            }
            { step === 1 &&
                <> 
                    <button type="button" className="btn btn-success" onClick={ addUser }>Add User</button>
                    <div onClick={ nextStep } className="section-1" >
                        <UsersPage onSelectUser={ setSelectedUserId } />
                    </div>

                </>
            }
            { step === 2 && 
                <>
                    <div>
                       <UserPage userId={ selectedUserId } /> 
                    </div>
                    <button type="button" className="btn btn-warning m-3 btn-lg btn-block" onClick={ prevStep }>Back</button>
                </>
            }
        </div>
    );
};

export const HomePage = () => {
    return (
        <div>
            <MyHomePage />
        </div>
    );
};
