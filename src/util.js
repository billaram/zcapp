var Util = (function(){

	var parseCriteria = function(criteria)
	{
		var keys = Object.keys(criteria)
			var qarr =[]
			for(var i=0,j=keys.length;i<j;i++)
			{
				
				var field = keys[i]
				var value = criteria[field];
				var q="";
				if(value instanceof Object)
				{
					q = field +value.op+'"'+value.value+'"';
					console.log('q',q)
				}
				else
				{
					q = field+ '=='+'"'+value+'"';
				}
				qarr.push(q)
				
			}
			var criteria_query = qarr.join(" && ");
			return criteria_query;

	}

	return{
		parseCriteria:parseCriteria
	}
})()

module.exports = Util