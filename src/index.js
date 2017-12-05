"use strict";
var Form = require('./form')
var View = require('./view')
var API = require('./api.js')
class ZCapp
{
	constructor(appconf)
	{
		this.appName = appconf.appName;
		this.ownername = appconf.ownername;
		this.authtoken = appconf.authtoken;
		this.views ={}
		this.forms = {}
		this.currentView
	}
	view(formName,viewName)
	{
		if(!this.views[viewName])
		{
			var appconf = {
				appName:this.appName,
				ownername:this.ownername,
				authtoken:this.authtoken
			}
			var viewconf = {
				viewName:viewName,
				formName:formName
			}
			var view = new View(appconf,viewconf)
			this.addView(viewName,view)
			return view;
		}
		else{
			return this.views[viewName]
		}
		
		
	}
	form(formName)
	{
		if(!this.forms[formName])
		{
			var appconf = {
				appName:this.appName,
				ownername:this.ownername,
				authtoken:this.authtoken
			}
			var formconf = {
				formName:formName
			}
			var form = new Form(appconf,formconf)
			this.addForm(formName,form)
			return form;
		}
		else{
			return this.forms[formName]
		}

	}
	addView(viewName,view)
	{
		this.views[viewName] = view
	}
	addForm(formname,form)
	{
		this.forms[formname] = form
	}

	get()
	{
		API.get
	}
}

module.exports = ZCapp