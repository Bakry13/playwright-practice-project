import { test, expect } from '@playwright/test';
import usersRequest from '../endpoints/users-endpoints';
//=======================Variables==========================
let response;
let jsonResponse;
//========================Tests=============================
test.describe('Users API test @api',() =>{
    //-----------------------get 200------------------------
    test('Check get users response success response', async ({request}) => {
        response = await usersRequest.getUsers(request);
        jsonResponse = await response.json();
        //assert on status code
        await expect(response.status()).toBe(200);
        //assert on list length
        await expect(jsonResponse.length).toBe(100);
    });
    //----------------------get with params 200---------------
    test('Check get users response for a specific user', async ({request}) => {
        response = await usersRequest.getUser2(request);
        jsonResponse = await response.json();
        console.log(jsonResponse);
        await expect(jsonResponse[0].title).toEqual('qui est esse');
    });
    //-----------------get response headers 200---------------
    test('Check get users response header', async ({request}) => {
        response = await usersRequest.getUsers(request);
        const headers = await response.headers();
        console.log(headers);
        await expect(headers.connection).toEqual('keep-alive');
    });
    //-----------------------post 201-------------------------
    test('Check post user response status code and body', async ({request}) => {
        response = await usersRequest.createUser(request);
        jsonResponse = await response.json();
        console.log(jsonResponse);
        //assert on response body
        await expect(jsonResponse.id).toEqual(101);
    });
});