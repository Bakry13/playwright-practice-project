function getEnv(){
    const env = process.env.ENV!;
    if ( env === 'staging'){
        console.log('Running tests on staging environment');
    }
    else if ( env === 'test'){
        console.log('Running tests on test environment');
    }
}

export default {getEnv};