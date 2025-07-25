import { test } from '@playwright/test';
import uiHelper from '../../utils/ui-helper';

test.only('Check that internal website fe performance is acceptable', {
    tag: ['@ui', '@sanity', '@regression', '@performance'],
    annotation: {
        type: 'ui, sanity, regression and performance test',
        description: 'Check that fronted performance, accessability, best practicis and seo are acceptable',
    }},
    async({}) => {
        await uiHelper.checkFEPerformance(test.info(), 'websiteName');
});
