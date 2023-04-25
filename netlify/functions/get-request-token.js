const Flickr = require("flickr-sdk");

exports.handler = async (event, context) => {
    console.log('EVENT', event);
    console.log('Context', context);
    console.log('Process', process.env);
    const oauth = new Flickr.OAuth(
        process.env.FLICKR_API_KEY,
        process.env.FLICKR_API_SECRET,
    );
    const _res = await oauth.request(`${process.env.URL}/flickr/oauth/callback`);
    const requestToken = _res.body.oauth_token;
    const requestTokenSecret = _res.body.oauth_token_secret;
    return {
        statusCode: 302,
        headers: {
            Location: oauth.authorizeUrl(requestToken, 'delete')
        }
    }

/*        .then(function (_res) {
        const requestToken = _res.body.oauth_token;
        const requestTokenSecret = _res.body.oauth_token_secret;

        // store the request token and secret in the database
        // db.oauth.set(requestToken, requestTokenSecret);

        // redirect the user to flickr and ask them to authorize your app.
        // perms default to "read", but you may specify "write" or "delete".
/!*        res.statusCode = 302;
        res.setHeader('location', oauth.authorizeUrl(requestToken, 'delete'));
        res.end(); *!/
        console.log('OUAI ?', oauth.authorizeUrl(requestToken, 'delete'));
        return {
            statusCode: 302,
            headers: {
                Location: oauth.authorizeUrl(requestToken, 'delete')
            }
        }

    }).catch(function (err) {
        return {
            statusCode: 400,
            err: err.message,
        }
    });*/
}