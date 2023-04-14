const Flickr = require("flickr-sdk");

exports.handler = async (event, context) => {
    const flickrOptions = {
        api_key: process.env.FLICKR_API_KEY,
        secret: process.env.FLICKR_SECRET,
    };

    const flickr = await new Promise((resolve, reject) => {
        Flickr.authenticate(flickrOptions, (error, flickr) => {
            if (error) {
                reject(error);
            } else {
                resolve(flickr);
            }
        });
    });

    const photos = await new Promise((resolve, reject) => {
        flickr.photos.search(
            {
                user_id: "188154180@N06",
                per_page: 100,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.photos.photo);
                }
            }
        );
    });

    const photoUrls = photos.map((photo) => {
        return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
    });

    return {
        statusCode: 200,
        body: JSON.stringify(photoUrls),
    };
};
