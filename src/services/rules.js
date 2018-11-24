let passwordGeneratorRule = {
	length: 10,
    numbers: true,
    uppercase: true,
    strict: true
};
exports.passwordGeneratorRule = passwordGeneratorRule;


let skipRoutesRule = [
	'/sso-login/',
	'/'
];
exports.skipRoutesRule = skipRoutesRule;