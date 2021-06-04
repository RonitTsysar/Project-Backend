const auth_domain = require("../domain/auth_domain");

// *****************************************ACCEPTANCE TESTING - LOGIN USE CASE *******************************************************

test('Check a successful login of a registered user', async () => {
    let userName = "danaKlim";
    let password = "dana123";
    const user = await auth_domain.loginUser(userName, password);
    expect(user).not.toBeNull();
});

test('Check an unsuccessful login of a registered user', async () => {
    let userName = "danaKlim";
    let password = "dana1234";
    const user = await auth_domain.loginUser(userName, password);
    expect(user).toBeNull();
});

test('Check an unsuccessful login of a registered user', async () => {
    let userName = "danaKlimenko";
    let password = "dana123";
    const user = await auth_domain.loginUser(userName, password);
    expect(user).toBeNull();
});



