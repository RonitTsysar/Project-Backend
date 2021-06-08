const {loginUser} = require("../domain/auth_domain");
const auth_utils = require("../utils/auth_utils");

//mocking auth_utils.loginUser
auth_utils.getUser = jest.fn(async (username)=>{
    let user = null;
    if(username === 'danaKlim'){
        user = {
            userId: 1,
            username: 'danaKlim',
            firstname: 'Dana',
            lastname: 'Klimenko',
            country: 'Israel',
            password: '$2a$13$zzB3Oo9FDGNy6Ig4wzKojefBrp9II2vpRnkZaekGpZQSFI9tk2ROG',
            email: 'danaklim@gmail.com',
            image: 'undefined'
        };
    }
    console.log("mocking user from fake DB");
    return user;
})

// ***************************************** UNIT TESTING - MATCHES ASSIGNMENT USE CASE 2 - LOGIN *******************************************************

test('Check a valid login of a user', async () => {
    let userName = "danaKlim";
    let password = "dana123";
    const user = await loginUser(userName, password);
    expect(user).not.toBeNull();
});

test('Check an unsuccessful login - wrong password', async () => {
    let userName = "danaKlim";
    let password = "dana1234";
    const user = await loginUser(userName, password);
    expect(user).toBeNull();
});

test('Check an unsuccessful login - wrong user name', async () => {
    let userName = "danaKlimenko";
    let password = "dana123";
    const user = await loginUser(userName, password);
    expect(user).toBeNull();
});



