const auth_domain = require("../domain/auth_domain");

test('check login successfull', async () => {
    let username = 'danaKlim';
    let password = 'dana123';
    expect(
        await auth_domain.loginUser(username, password)
    ).not.toBeNull();
});

test('check login failed', async () => {
    let username = 'roydor';
    let password = 'roy123';
    expect(
        await auth_domain.loginUser(username, password)
    ).toBeNull();
});

