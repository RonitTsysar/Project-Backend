const auth_domain = require("../domain/auth_domain");

// *****************************************LOGIN USE CASE *******************************************************

test('Check a valid login of a user', async () => {
    let userName = "danaKlim";
    let password = "dana123";
    const user = await auth_domain.loginUser(userName, password);
    expect(user).not.toBeNull();
});

test('Check an unsuccessful login - wrong password', async () => {
    let userName = "danaKlim";
    let password = "dana1234";
    const user = await auth_domain.loginUser(userName, password);
    expect(user).toBeNull();
});

test('Check an unsuccessful login - wrong user name', async () => {
    let userName = "danaKlimenko";
    let password = "dana123";
    const user = await auth_domain.loginUser(userName, password);
    expect(user).toBeNull();
});



