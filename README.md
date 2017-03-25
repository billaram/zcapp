# Introduction
Creator CRUD API node driver, It connects to app scope and then APIs like create,update,delete and view records can be invoked, in method chaining approach, All API returns promise.

# Getting Started

* clone this repo 
* cd zcapp
* npm install

## Create record 

```javascript
var ZCapp = require('./app/ZCapp')
var app = new ZCapp({
	appName:'task-app',
	ownername:'ramkumarm1',
	authtoken:process.env.ZCTOKEN
})

var formdata = {
	title:"Test Task",
	description:"Test",
	task_type:"feat"
	

}
app.form('tasks').add(formdata)
	.then((response) => {
		
		console.log('ADD RECORD',JSON.stringify(response,null,4))
		
	
	})
	.catch(e =>{
		console.log('CATCH ',e)
	})
```


