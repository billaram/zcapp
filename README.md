# ZCApp
[![travis build](https://img.shields.io/travis/billaram/zcapp.svg?style=flat-square)](https://travis-ci.org/billaram/zcapp)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Introduction
Zoho Creator CRUD API node driver connects to app scope and then APIs like create,update,delete and view records can be invoked in method chaining approach. All APIs returns promise.

# Getting Started

* npm install zcapp

## CRUD functions

* Create Record API
* Update Record API
* View Record API
* Delete Record API

## Response Structure

All response structures are common 
```javascript

{
	actualresponse:'// holds actual response sent by creator',
	data:'null if status failed otherwise holds proper parsed response',
	status:"success or failed"
}

```
## Example

```javascript
var ZCapp = require('zcapp');
var app = new ZCapp({
	appName:'appLinkName',
	ownername:'zc_ownername',
	authtoken:process.env.ZCTOKEN
})

var formdata = {
	title:"Test data",
	description:"description",
	task_type:"feat"
	

}

//Create Record API
app.form('formLinkName').add(formdata)
	.then((response) => {
		/* sample response
			{
			    "actualresponse": {
			        "formname": [
			            "formLinkName",
			            {
			                "operation": [
			                    "add",
			                    {
			                        "values": {
			                            "description": "description",
			                            "ID": 1946659000002034343,
			                            "title": "Test data",
			                            "task_type": "feat"
			                        },
			                        "status": "Success"
			                    }
			                ]
			            }
			        ]
			    },
			    "data": {
			        "description": "description",
			        "ID": 1946659000002034343,
			        "title": "Test data",
			        "task_type": "feat"
			    },
			    "status": "success"
			}

		*/
		
	
	})
	.catch(e =>{
		console.log('CATCH ',e)
	})

//Update Record API
var criteria ={
	task_type:"feat",
	title:{
		op:"=="
		value:"test"
	}

}

app.form('formLinkName').update(formdata,criteria)
	.then((response) =>{
		/* sample response
			"actualresponse": {
		        "formname": [
		            "formLinkName",
		            {
		                "operation": [
		                    "update",
		                    {
		                        "criteria": "task_type==\"feat\"",
		                        "newvalues": [
		                            {
		                                "description": "Test",
		                                "title": "Test Task",
		                                "task_type": "feat"
		                            }
		                        ],
		                        "status": "Success"
		                    }
		                ]
		            }
		        ]
		    },
		    "data": {
		        "updatedvalues": [
		            {
		                "description": "Test",
		                "title": "Test Task",
		                "task_type": "feat"
		            }
		        ],
		        "criteria": "task_type==\"feat\""
		    },
		    "status": "success"
		*/
	})

//View Record API
var criteria ={
	task_type:"feat",
	title:{
		op:"=="
		value:"test"
	}

}
// params criteria,startingIndex and limit are optional
app.view('formLinkName','viewLinkName').find(criteria,startingIndex,limit)
	.then((response) =>{
		/* sample response
		{
			"actualresponse": {
		
		        "formLinkName": [
		            {
		                "description": "Test",
		                "ID": 1946659000002032000,
		                "title": "Test Task",
		                "task_type": "feat"
		            }
		       	]
		    },
		    "data": [{
		        "description": "Test",
		        "ID": 1946659000002032000,
		        "title": "Test Task",
		        "task_type": "feat"
		    }],
		    "status": "success",
		    "recordCount": 1
		}

		*/
	})
// instead of array it returns an object in data key
app.view('formLinkName','viewLinkName').findOne(criteria)
	.then((response) =>{
		/* sample response
		{
			"actualresponse": {
		
		        "tasks": [
		            {
		                "description": "Test",
		                "ID": 1946659000002032000,
		                "title": "Test Task",
		                "task_type": "feat"
		            }
		       	]
		    },
		    "data": {
		        "description": "Test",
		        "ID": 1946659000002032000,
		        "title": "Test Task",
		        "task_type": "feat"
		    },
		    "status": "success",
		    "recordCount": 1
		}

		*/
	})

//Delete Record API
var delete_criteria = {
	task_type:"feat"
}
app.form('formLinkName').delete(delete_criteria)
	.then((response) =>{
		/* sample response
			{
				"actualresponse": {
			        "formname": [
			            "tasks",
			            {
			                "operation": [
			                    "delete",
			                    {
			                        "criteria": "task_type==\"feat\"",
			                        "status": "Success"
			                    }
			                ]
			            }
			        ]
			    },
			    "data": {
			        "criteria": "task_type==\"feat\"",
			        "status": "Success"
			    },
			    "status": "success"
			}
		*/

	})

```


