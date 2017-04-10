"use strict";
var querystring = require('querystring')
var Promise = require('bluebird')
var request = require('request')
class API{
	
	add(formdata)
	{
		post(formdata)
	}

	update(formdata,criteria)
	{
		put(formdata,criteria)
	}

	post(url,formdata)
	{
		var body = querystring.stringify(formdata)
		return new Promise( (resolve,reject) => {
			request.post({
				  headers: {'content-type' : 'application/x-www-form-urlencoded'},
				  url:     url,
				  body:    body
				},function(error,response,body){
					if(error)
					{
						reject(error)
					}
					resolve(body)

					
			})
		})
	}
	put(formdata,criteria)
	{
		
	}
	get(url,query)
	{
		url = url+"?"+query
		return new Promise( (resolve,reject) => {
			request.post(url,function(error,response,body){
				if(error)
				{
					reject(error)
				}
				resolve(body)

					
			})
		})
		
	}
}
module.exports = new API()