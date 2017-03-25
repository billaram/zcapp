var API = require('./api.js')
var Promise = require('bluebird')
var Util = require('./util')
class Form{
	constructor(appconf,formconf){
		this.appconf = appconf
		this.formName = formconf.formName
	}

	add(formdata)
	{
		return this.post(formdata)
	}
	update(formdata,criteria)
	{
		this.endpoint = 'https://creator.zoho.com/api/'+this.appconf.ownername+'/json/'
			+this.appconf.appName+'/form/'+this.formName+'/record/update'

		formdata['authtoken'] = this.appconf.authtoken
		formdata['scope'] = 'creatorapi'
		formdata['zc_ownername'] = this.appconf.ownername
		if(criteria)
		{
			formdata['criteria'] = Util.parseCriteria(criteria)
		}
		return new Promise((resolve,reject) =>{
			API.post(this.endpoint,formdata)
				.then((response) => {
					try
					{
						var response = JSON.parse(response)
						if(response.formname)
						{
							var body = response.formname[1].operation[1];
							var data = null;
							if(body.status == "Success")
							{
								data = {updatedvalues:body.newvalues,
									criteria:body.criteria
								};
							}
							var resp = {
								actualresponse:response,
								data:data,
								status:'success'
							}
							
						}
						else
						{
							var resp ={
								actualresponse:response,
								status:'failed'
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
					resolve(resp)
				})
				.then(e =>{
					reject(e)
				})
		})
	}
	post(formdata)
	{
		this.endpoint = 'https://creator.zoho.com/api/'+this.appconf.ownername+'/json/'
			+this.appconf.appName+'/form/'+this.formName+'/record/add'
		formdata['authtoken'] = this.appconf.authtoken
		formdata['scope'] = 'creatorapi'
		formdata['zc_ownername'] = this.appconf.ownername
		return new Promise((resolve,reject) =>{
			API.post(this.endpoint,formdata)
				.then((response) => {
					try
					{
						var response = JSON.parse(response)
						if(response.formname)
						{
							var body = response.formname[1].operation[1];
							var data = null;
							if(body.status == "Success")
							{
								data = body.values;
							}
							var resp = {
								actualresponse:response,
								data:data,
								status:'success'
							}
							
						}
						else
						{
							var resp ={
								actualresponse:response,
								status:'failed'

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
					resolve(resp)
				})
				.catch(e =>{
					console.log(e)
					reject(e)
				})
		})
	}
	delete(criteria)
	{
		this.endpoint = 'https://creator.zoho.com/api/'+this.appconf.ownername+'/json/'
			+this.appconf.appName+'/form/'+this.formName+'/record/delete'
		var formdata = {}
		formdata['authtoken'] = this.appconf.authtoken
		formdata['scope'] = 'creatorapi'
		formdata['zc_ownername'] = this.appconf.ownername
		if(criteria)
		{
			formdata['criteria'] = Util.parseCriteria(criteria)
		}
		return new Promise((resolve,reject) =>{
			API.post(this.endpoint,formdata)
				.then((response) => {
					try
					{
						var response = JSON.parse(response)
						if(response.formname)
						{
							var body = response.formname[1].operation[1];
							var data = null;
							if(body.status == "Success")
							{
								data = body;
							}
							var resp = {
								actualresponse:response,
								data:data,
								status:'success'
							}
							
						}
						else
						{
							var resp ={
								actualresponse:response,
								status:'failed'
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
					resolve(resp)
				})
				.catch(e =>{
					reject(e)
				})
		})
	}
}
module.exports = Form;