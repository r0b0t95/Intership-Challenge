import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, vi, it, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import { UserPage } from "../../src/pages/UserPage";
import { postUser, patchUser, deleteUser, getUser } from "../../src/services/User";

vi.mock("../../src/services/User");

describe("MyUserPage", () => {

    beforeEach(() => {
        // reset all mocks
        vi.clearAllMocks();
    });

    it('UserPage, handleSubmit, postUser with correct data', async () => {

        postUser.mockResolvedValue( "User saved successfully" );

        render(<UserPage userId={ 0 } />);

        // declare input fields and submit button
        const firstNameInput = screen.getByPlaceholderText( /First Name/i );
        const lastNameInput = screen.getByPlaceholderText( /Last Name/i );
        const emailInput = screen.getByPlaceholderText( /Email/i );
        const avatarInput = screen.getByPlaceholderText( /Avatar/i );
        const submitButton = screen.getByText( /Submit/i );

        // add data into the input fields
        await userEvent.type( firstNameInput, 'Robert' );
        await userEvent.type( lastNameInput, 'Chaves' );
        await userEvent.type( emailInput, 'robertchavesp@gmail.com' );
        await userEvent.type( avatarInput, 'https://example.com/avatarRobert.jpg' );

        // button
        await userEvent.click( submitButton );

        const expectedJSON = {
            first_name: 'Robert',
            last_name: 'Chaves',
            email: 'robertchavesp@gmail.com',
            avatar: 'https://example.com/avatarRobert.jpg'
        };

        // verify API call
        expect( postUser ).toHaveBeenCalledWith( expectedJSON );

        // verify response
        expect( await screen.findByText( /User saved successfully/i ) ).toBeInTheDocument();
    });
    

    it('UserPage, handleSubmit, patchUser with correct data', async () => {

        patchUser.mockResolvedValue( "User updated successfully" );

        render(<UserPage userId={ 1 } />);

        // declare input fields and submit button
        const firstNameInput = screen.getByPlaceholderText( /First Name/i );
        const lastNameInput = screen.getByPlaceholderText( /Last Name/i );
        const emailInput = screen.getByPlaceholderText( /Email/i );
        const avatarInput = screen.getByPlaceholderText( /Avatar/i );
        const submitButton = screen.getByText( /Submit/i );

        // add data into the input fields
        await userEvent.type( firstNameInput, 'Adriana' );
        await userEvent.type( lastNameInput, 'Chaves' );
        await userEvent.type( emailInput, 'adrianachavesp@gmail.com' );
        await userEvent.type( avatarInput, 'https://example.com/avatarAdriana.jpg' );

        // button
        await userEvent.click( submitButton );

        const expectedJSON = {
            first_name: 'Adriana',
            last_name: 'Chaves',
            email: 'adrianachavesp@gmail.com',
            avatar: 'https://example.com/avatarAdriana.jpg'
        };

        // verify API call
        expect( patchUser ).toHaveBeenCalledWith( 1, expectedJSON );

        // verify response
        expect( await screen.findByText( /User updated successfully/i ) ).toBeInTheDocument();
    });


    it('UserPage, handleDelete, deleteUser with correct userId', async () => {

        deleteUser.mockResolvedValue( "User deleted successfully" );

        render(<UserPage userId={ 1 } />);

        // declare delete button
        const deleteButton = screen.getByText( /Delete/i );

        // button
        await userEvent.click( deleteButton );

        // verify API call
        expect( deleteUser ).toHaveBeenCalledWith( 1 );

        // verify response
        expect( await screen.findByText( /User deleted successfully/i ) ).toBeInTheDocument();
    });


    it("UserPage, getUser with correct userId and displays user data", async () => {
        // Mock user object
        const expectedJSON = {
            first_name: "Juan",
            last_name: "Quiros",
            email: "juanqui@proton.com",
            avatar: "https://example.com/avatar.jpg",
        };

        // Mock the API response
        getUser.mockResolvedValue( expectedJSON );

        // Render the component with userId = 1
        render(<UserPage userId={1} />);

        // Ensure getUser is called with the correct userId
        expect( getUser ).toHaveBeenCalledWith(1);

        // Wait for data to be displayed
        await waitFor(() => {
            expect( screen.getByPlaceholderText( /First Name/i ) ).toHaveValue("Juan");
            expect( screen.getByPlaceholderText( /Last Name/i ) ).toHaveValue("Quiros");
            expect( screen.getByPlaceholderText( /Email/i ) ).toHaveValue("juanqui@proton.com");
            expect( screen.getByPlaceholderText( /Avatar/i ) ).toHaveValue("https://example.com/avatar.jpg");
        });

    });

});