const { validationResult } = require('express-validator/check');
const https = require('../../services/https');
var jwt = require('../../services/manage-token');
const loginTableDB = require('../../models/login');
const loginTrans = require('../../transformers/LoginTransformers');

exports.loginUser = function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
   
    var data = {
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.body.code,
        redirect_uri: 'http://localhost:8000/callback'
    };
    https.postForExternalRequest('/oauth/token', data).then((success)=> {
        var userToken = success.data;
        jwt.validateToken(userToken.id_token).then((success)=> {
            loginTableDB.getUserFromDB(success.sub).then((success)=> {
                if(success.length > 0) {
                    return res.status(200).json({ data: loginTrans.transformUserAndToken(JSON.parse(success[0].user_meta), userToken.id_token) });
                }else {
                    return res.status(422).json({ errors: "Records not exist" });
                }
            }, (err) => {
            })
        }, (err) => {
            return res.status(401).json({ errors: err });
        })
    }, (err)=> {
        return res.status(401).json({ errors: err.response.data });
    })
};
