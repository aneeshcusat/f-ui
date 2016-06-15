'use strict';

var request = require("request"),
    webServiceURL = require('../../config/webserviceUrls')

exports.getuser =  function (req, res, next) {

  request({
        uri: webServiceURL.getuser,
        method: "GET",
        json: true,
    }, function(error, response, data) {
    	 if (error == null) {
	    	res.render('getuser', {
	            title: 'Get User details',
	            user: {
	                firstname: data.firstName,
	                lastname: data.lastName,
	                email: 'test@aneesh.com'
	            }
	        }
	        );
    	 } else {
    		 res.render('servererror',{
    			 message : error
    		 });
    	 } 
    });
}
	