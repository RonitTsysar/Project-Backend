const auth_utils = require("../utils/auth_utils");

// *****************************************UNIT TESTING - LOGIN USE CASE *******************************************************

test('Check a successful get from DB of a registered user', async () => {
    let userName = "danaKlim";
    const user = await auth_utils.getUser(userName);
    let expectedUser = {
        userId: 1,
        username: 'danaKlim',
        firstname: 'Dana',
        lastname: 'Klimenko',
        country: 'Israel',
        password: '$2a$13$zzB3Oo9FDGNy6Ig4wzKojefBrp9II2vpRnkZaekGpZQSFI9tk2ROG',
        email: 'danaklim@gmail.com',
        image: 'undefined'
    };
    expect(user).toEqual(expectedUser);
});

test('Check a successful get from DB of a registered user', async () => {
    let userName = "danaKlm";
    const user = await auth_utils.getUser(userName);
    expect(user).toBeUndefined();
});