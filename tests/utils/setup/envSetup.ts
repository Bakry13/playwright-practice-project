import testData from '../../../testData/testUsers';
import stagingData from '../../../testData/stagingUsers';

function getEnv(){
    const env = process.env.ENV!;
    if ( env === 'staging'){
        console.log('Running tests on staging environment');
    }
    else if ( env === 'test'){
        console.log('Running tests on test environment');
    }
}

function getData(){
    const env = process.env.ENV!;
    if ( env === 'staging'){
        return stagingData;
    }
    else if ( env === 'test'){
        return testData;
    }
}

export default {getEnv, getData};