import axios from 'axios';

const User_API_URL = `https://reqres.in/api/users`;

export const getUsers = async () => {
    try {
        const res = await axios.get( `${User_API_URL}/${'?page2'}` );
        console.log('getUsers response: ', res.data.data);
        return res.data.data;
    } catch ( error ) {
        console.error( 'Error in getUser:', error );
        return null;
    }
};

export const getUser = async ( userId ) => {
    
    if ( userId === 0 ) {
        return null;
    }

    try {
        const res = await axios.get( `${User_API_URL}/${userId}` );
        console.log('getUser response: ', res.data.data);
        return res.data.data;
    } catch ( error ) {
        console.error( 'Error in getUser: ', error );
        return null;
    }
};

export const deleteUser = async ( userId ) => {
    try {
        const res = await axios.delete( `${User_API_URL}/${userId}` );
        console.log('deleteUser response: ', res.status);
        return res.status === 204 ? 'User deleted successfully' : 'User was not deleted';
    } catch ( error ) {
        console.error( 'Error in deleteUser: ', error );
        return null;
    }
};

export const postUser = async ( userData ) => {
    try {
        const res = await axios.post( `${User_API_URL}`, `${userData}` );
        console.log('postUser response: ', res.status);
        return res.status === 201 ? 'User saved successfully' : 'User was not saved';
    } catch ( error ) {
        console.error( 'Error in postUser: ' ,error );
        return null;
    }
};

export const patchUser = async ( userId, userData ) => {
    try {
        const res = await axios.patch( `${User_API_URL}/${userId}`, `${userData}` );
        console.log('patchUser response: ', res.status);
        return res.status === 200 ? 'User updated successfully' : 'User was not updated';
    } catch ( error ) {
        console.error( 'Error in patchUser: ', error );
        return null;
    }
};
