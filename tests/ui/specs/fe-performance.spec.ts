import { test } from '../fixtures/login-fixture';
import lighthouseHelper from '../../utils/lighthouse-helper';

test.only('Check that internal website fe performance is acceptable', {
    tag: ['@ui', '@sanity', '@regression', '@performance'],
    annotation: {
        type: 'ui, sanity, regression and performance test',
        description: 'Check that fronted performance, accessability, best practicis and seo are acceptable',
    }},
    async({ loginPage }) => {
        await lighthouseHelper.checkFEPerformance(test.info(), 'https://opensource-demo.orangehrmlive.com/');
});
