//==========================Requests Objects===================
const baseUrl = 'https://jsonplaceholder.typicode.com';
const usersEndpoint = '/posts'
const userParam = {
    "id": 2
}
const requestBody = {
    "title": "foo",
    "body": "bar",
    "userId": 102
};
const requestHeaders = {
    "Content-Type": "application/json"
};
//==========================Requests===========================
//---------------------------Get 200---------------------------
async function getUsers(request) {
    // const response = request.get(baseUrl+usersEndpoint);
    const response = request.get(usersEndpoint);
    return response;
}
//-----------------------Get with param 200--------------------
async function getUser2(request) {
    // const response = await request.get(baseUrl+usersEndpoint,{
    //     params: userParam
    // });
    const response = await request.get(usersEndpoint,{
        params: userParam
    });
    return response;
}
//--------------------------post 201---------------------------
async function createUser(request) {
    // const response = await request.post(baseUrl+usersEndpoint,{
    //     // Headers: requestHeaders,
    //     data: requestBody
    // });
    const response = await request.post(usersEndpoint,{
        data: requestBody
    });
    return response;
}

export default { getUsers, getUser2, createUser };