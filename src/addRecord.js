require('dotenv-safe').load({
    allowEmptyValues: true,
    sample: './.env.sample'
});
console.log(process.env.ZCTOKEN)
var ZCapp = require('./app/ZCapp')
var app = new ZCapp({
	appName:'task-app',
	ownername:'ramkumarm1',
	authtoken:process.env.ZCTOKEN
})

//var form = app.view('viewname').get({})

var formdata = {
	title:"Test Task",
	description:"Test",
	task_type:"feat"
	

}

/*
* Syntax
* app.form('formLinkName').add(formdata)
*/

app.form('tasks').add(formdata)
	.then((response) => {
		var end  = new Date();
		console.log('ADD RECORD',JSON.stringify(response,null,4))
		
	
	})
	.catch(e =>{
		console.log('CATCH ',e)
	})
