"use strict";
var Promise = require('bluebird');
var querystring = require('querystring')
var API = require('./api.js')
var Util = require('./util')

class View{
	constructor(appconf,viewconf)
	{
		this.appconf = appconf;
		this.viewName = viewconf.viewName;
		this.formName = viewconf.formName;
		this.endpointURL = 'https://creator.zoho.com/api/json/';
	}
	changeEndPointURL(url)
	{
		this.endpointURL = url;
	}
	find(criteria,startingIndex,limit){
		return this.get(criteria,startingIndex,limit)
	}
	findOne(criteria,startingIndex,limit){
		return this.get(criteria,startingIndex,1)
	}
	get(criteria,startingIndex,limit)
	{
		this.endpoint = this.endpointURL+this.appconf.appName+'/view/'+this.viewName
		var query = {}
		
		query['authtoken'] = this.appconf.authtoken
		query['scope'] = 'creatorapi'
		query['zc_ownername'] = this.appconf.ownername
		query['raw'] = 'true'
		
		if(criteria)
		{
			var criteria_query = Util.parseCriteria(criteria)
			query['criteria'] = criteria_query;
		}
		if(startingIndex)
		{
			query['startindex'] = startingIndex
		}
		if(limit)
		{
			query['limit'] = limit
		}
		query =  querystring.stringify(query)
		return new Promise((resolve,reject) =>{
			API.get(this.endpoint,query)
				.then((response) => {
					try
					{
						response = JSON.parse(response)
						
						var records = response[this.formName]
						if(records != undefined)
						{
							var resp = {
								actualresponse:response,
								data:records,
								status:'success'
							}
							resp['recordCount'] = records.length
							if(limit == 1)
							{
								resp['data'] = records[0]
							}
						}
					}
					catch(ex)
					{
						var resp ={
							actualresponse:response,
							status:'failed'
						}
					}

					this.lastResponse = resp;
					resolve(resp)
				})
				.catch(e =>{
					this.logs.push({url:this.endpoint,criteria:criteria,startindex:startingIndex,limit:limit,err:e})
					reject(e)
				})
		})
	}
	getLastResponse()
	{
		return this.lastResponse;
	}
}
module.exports  = View;