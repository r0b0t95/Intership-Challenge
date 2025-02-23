## Intership challenge using ReactJS and Vitest by Robert Chaves P.






### Run application: 
remember install ***node_modules*** dependencies then will launch the application in your web browser
```powershell
    npm install
```
```powershell
    npm run dev
```
![[rundev]](readme_photos/runDev.png)


### Login
![[loginSuccess]](readme_photos/login.png)

### Login error
If the credentials are incorrect, you’ll see an error message:
![[loginError]](readme_photos/loginError.png)

## User management features
This app allows you to manage users with basic CRUD (Create, Read, Update, Delete) operations.

### Get Users
The following screenshot shows the list of users retrieved from the API.
### Add User Button
Opens a form to create a new user.
![[getUsers]](readme_photos/getUsers.png)

### Post User Form
### Back Button 
Navigates back to the previous page or user list.
![[postUserForm]](readme_photos/postUserForm.png)

### Update User Form
### Back Button 
Navigates back to the previous page or user list.
![[updateUserForm]](readme_photos/updateUserForm.png)

### Post User
To create a new user, fill out the form and submit,
if successful, you’ll see a confirmation message: **User saved successfully**
![[postUser]](readme_photos/postSuccess.png)

### Update User
To modify an existing user’s details, update the form and submit,
if successful, you’ll see this confirmation: **User updated successfully**
![[updateUser]](readme_photos/updateSuccess.png)

### Delete User
Click the delete button to remove a user,
If successful, you’ll see this confirmation: **User deleted successfully**
![[deleteUser]](readme_photos/deleteSuccess.png)

### Blank text field
If any required field is left blank, you will see an error, message like this: **Las name is blank**
![[blankTextField]](readme_photos/textFieldBlank.png)


### You can see the logs when you use the website in the console zone in the browser
![[logs]](readme_photos/logs.png)

### Run test
To run unit tests for the project, use the following command:
```powershell
    npm run test
```
This will execute the test suite and verify the functionality of the app.
![[unitest]](readme_photos/unitTest.png)


## API Reference and EndPoints
The app interacts with an external API for user management.
link: [ReqRes API](https://reqres.in)

### Get Users
Endpoint:
```http
    GET https://reqres.in/api/users?page2
```
Code Implementation:
```js
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

```

### Get User, endpoint and code
Endpoint:
```http
    GET https://reqres.in/api/users/2
```
Code Implementation:
```js
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
```

### Post User, endpoint and code
Endpoint:
```http
    POST https://reqres.in/api/users
```
Code Implementation:
```js
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
```

### Patch User, endpoint and code
Endpoint:
```http
    PATCH https://reqres.in/api/users/2
```
Code Implementation:
```js
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
```

### Delete User, endpoint and code
Endpoint:
```http
    DELETE https://reqres.in/api/users/2
```
Code Implementation:
```js
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
```
