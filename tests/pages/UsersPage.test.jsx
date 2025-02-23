import { render, screen, waitFor } from '@testing-library/react';
import { vi, it, describe, expect, beforeEach } from 'vitest';
import { UsersPage } from '../../src/pages/UsersPage'; 
import { getUsers } from '../../src/services/User'; 

vi.mock('../../src/services/User'); 

describe('UsersPage', () => {

    beforeEach(() => {
        // reset all mocks
        vi.clearAllMocks();
    });

    it('UsersPage, getUsers and displays users data', async () => {
        // Mock list of users
        const expectedJSON = [
            {
                id: 1,
                first_name: 'Jorge',
                last_name: 'Lopez',
                email: 'jlopez@proton.com',
                avatar: 'https://example.com/avatar11.jpg',
            },
            {
                id: 2,
                first_name: 'Erick',
                last_name: 'Alvarez',
                email: 'erickaz@proton.com',
                avatar: 'https://example.com/avatar22.jpg',
            },
        ];

        // Mock the API response
        getUsers.mockResolvedValue( expectedJSON );

        // Render the component
        render(<UsersPage onSelectUser={() => {}} />);

        // Wait for the users to be displayed
        await waitFor(() => {
            expect( screen.getByText( "Jorge" ) ).toBeInTheDocument();
            expect( screen.getByText( "Erick" ) ).toBeInTheDocument();
        });

        // Ensure avatars are displayed correctly
        const avatarImages = screen.getAllByAltText( 'avatar' );
        expect( avatarImages[0] ).toHaveAttribute( 'src', 'https://example.com/avatar11.jpg' );
        expect( avatarImages[1] ).toHaveAttribute( 'src', 'https://example.com/avatar22.jpg' );
    });

  

  it('UsersPage, getUsers and display empty data', async () => {
        // Mock empty list
        const expectedEmptyJSON = [];

        // Mock the API response
        getUsers.mockResolvedValue( expectedEmptyJSON );

        // Render the component
        render(<UsersPage onSelectUser={() => {}} />);

        // Wait for the users to be displayed
        await waitFor(() => {
            expect( screen.getByText( "Loading Users..." ) ).toBeInTheDocument();
        });
    });



});
