const Flickr = require("flickr-sdk");

const oauth = new Flickr.OAuth(
    process.env.FLICKR_CONSUMER_KEY,
    process.env.FLICKR_CONSUMER_SECRET
);

exports.handler = async (event, context) => {
    console.log('EVENT', event);
    console.log('Context', context);

    return {};

    oauth.verify(requestToken, oauthVerifier, requestTokenSecret).then(function (_res) {
        const userNsid = _res.body.user_nsid;
        const oauthToken = _res.body.oauth_token;
        const oauthTokenSecret = _res.body.oauth_token_secret;
        let flickr;

        // create a new Flickr API client using the oauth plugin
        flickr = new Flickr(oauth.plugin(
            oauthToken,
            oauthTokenSecret
        ));

        // make an API call on behalf of the user
        flickr.test.login().then((info, err) => {
            if (err) {
                return  {
                    statusCode: 302,
                    headers: {
                        Location: 'http://localhost:8888/?auth=failed'
                    }
                }
                console.error(err)
            } else {
                return  {
                    statusCode: 302,
                    headers: {
                        Location: `http://localhost:8888/admin?userId=${userNsid}`,
                    }
                }
            }
        })
    }).catch(function (err) {
        return {
            statusCode: 400,
            err: err.message,
        }
    });
}