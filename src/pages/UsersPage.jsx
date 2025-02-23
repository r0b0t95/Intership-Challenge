import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/User'

const MyUsersPage = ({ onSelectUser }) => {
    const [ users, setUsers ] = useState( [] );
    
    useEffect(() => {
        const getUsersData = async () => {
            const res = await getUsers()
            if ( res ) {
                setUsers( res )
            }
        }
        getUsersData();
    }, []);
    
    return (

        <div className="container">
            <h2 className="m-1">Users</h2>
            <div className="row justify-content-center">
                { users.length > 0 ?(
                    users.map( user => (
                        <div key={ user.id } className="col-md-4 col-sm-6 col-12 mb-4" >
                            <div
                                className="text-center p-2 card"
                                onClick={ () => onSelectUser( user.id ) }                            
                            >
                                <img src={ user.avatar } alt="avatar" id="avatar" className="card-img-top" />
                                <div className="card-body">
                                    <h6 className="card-title" id="first-name">{ user.first_name }</h6>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading Users...</p>
                )}        
            </div>
        </div>
    );
};

export const UsersPage = ( props )  => {
  return (
    <div>
        <MyUsersPage  onSelectUser={ props.onSelectUser } />
    </div>
  );
};
