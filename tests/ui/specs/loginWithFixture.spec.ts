import { test } from '../fixtures/loginFixture';
import tsData from '../../../testData/testUsers';

//====================Tests======================
test('valid login', async ( {poManager} ) => {
    await poManager.getLoginPage().login(tsData.username, tsData.password);
    await poManager.getHomePage().assertProfileIcon();
});

test('invalid login', async ( {poManager, loginPage} ) => {
    await poManager.getLoginPage().login(tsData.username, 'admin12');
    await loginPage.assertInvalidLoginMessage();
});