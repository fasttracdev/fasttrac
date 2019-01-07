let passwordGeneratorRule = {
	length: 10,
    numbers: true,
    uppercase: true,
    strict: true
};
exports.passwordGeneratorRule = passwordGeneratorRule;


let skipRoutesRule = [
	'/sso-login/',
    '/',
    '/user/forgot-password',
    '/fasttrac/sync-driver-report',
    '/fasttrac/sync-drivers'
    
];
exports.skipRoutesRule = skipRoutesRule;