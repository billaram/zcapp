# Introduction
Creator CRUD API node driver, It connects to app scope and then APIs like create,update,delete and view records can be invoked, in method chaining approach, All API returns promise.

# Getting Started

* npm install zcapp

## Create record 

```javascript
var ZCapp = require('zcapp')
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
app.form('tasks').add(formdata)
	.then((response) => {
		
		console.log('ADD RECORD',JSON.stringify(response,null,4))
		/* sample response
			{
			    "actualresponse": {
			        "formname": [
			            "tasks",
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
			        "ID": 1946659000002030000,
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
```


