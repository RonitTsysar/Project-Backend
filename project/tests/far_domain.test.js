const {checkFarIsValid} = require("../domain/far_domain");
const far_utils = require("../utils/far_utils");

//mocking far_utils.checkIfFarIsValid
far_utils.checkIfFarIsValid = jest.fn(async (userId) => { 
        var far = {0:2} //fake DB.

        if(userId === undefined){
            return false;
        }    
    
        const refereeId = far[0];
    
        if(userId != refereeId){
            return false;
        }
        console.log("mocking");
        return true;
    })

// *****************************************UNIT TESTING - MATCHES ASSIGNMENT USE CASE 10 *******************************************************

test('Check if unvalid far id belongs to a valid far user', async () => {
    const isValid = await checkFarIsValid(3);
    expect(isValid).toEqual(false);
});

test('Check if valid far id belongs to a valid far user', async () => {   
    const isValid = await checkFarIsValid(2);
    expect(isValid).toEqual(true);
});

test('Check if undefined far id belongs to a valid far user', async () => {  
    const isValid = await checkFarIsValid(undefined);
    expect(isValid).toEqual(false);
    
});




