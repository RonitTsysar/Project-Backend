const far_domain = require("../domain/far_domain");

// *****************************************UNIT TESTING - MATCHES ASSIGNMENT USE CASE 10 *******************************************************

test('Check if far id belongs to a valid far user', async () => {    
    const isValid = await far_domain.checkFarIsValid(2);
    expect(isValid).toEqual(true);
});




