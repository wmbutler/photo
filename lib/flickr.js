    var Flickr = require('flickrapi');
    var flickrOptions = {
      api_key: "a191c26457819b1d1acc1fe6d5d42da2",
      secret: "53ba1735e2253613"
    };
 
    Flickr.authenticate(flickrOptions, function(error, flickr) {
        
           flickr.photos.search({
                user_id: 0,
                page: 1,
                per_page: 10
            }, function(err, result) {
                console.log(err,result);
            });

    });

