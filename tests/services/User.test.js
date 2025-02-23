import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getUser, getUser, deleteUser, postUser, patchUser } from "../../src/services/User";

// mock axios
vi.mock("axios");

// reset mocks
describe("User Service", () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    // test get user
    it("should getUser successfully", async () => {
        const mockUser2 = { 
            id: 2, 
            email: "janet.weaver@reqres.in", 
            first_name: "Janet", 
            last_name: "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
        };

        axios.get.mockResolvedValue({ data: { data: mockUser2 } });

        const user2 = await getUser( 2 );
        expect( user2 ).toEqual( mockUser2 );
    });


    it("should getUser return null if user ID is 0", async () => {
        const user0 = await getUser( 0 );
        expect( user0 ).toBeNull();
    });


    it("should delete a user successfully", async () => {
        axios.delete.mockResolvedValue({ status: 204 });

        const res = await deleteUser( 1 );
        expect( res ).toBe( "User deleted successfully" );
    });


    it("should update a user successfully", async () => {
        axios.patch.mockResolvedValue({ status: 200 });

        const mockUser1 = { 
            first_name: "Redro", 
            last_name: "Campos",
            email: "pedro.weaver@reqres.in",
            "avatar": "https://reqres.in/img/faces/5-image.jpg"
        };

        const res = await patchUser( 1, mockUser1 );
        expect(res).toBe( "User updated successfully" );
    });
    
    
    it("should post a user successfully", async () => {
        axios.post.mockResolvedValue({ status: 201 });

        const mockNewUser = { 
            first_name: "Robert", 
            last_name: "Chaves",
            email: "robert.chaves@reqres.in",
            "avatar": "https://reqres.in/img/faces/new-image.jpg"
        };

        const res = await postUser( mockNewUser );
        expect(res).toBe( "User saved successfully" );
    });


});