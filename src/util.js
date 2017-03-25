var moment = require('moment-timezone')
//moment.tz.load(require('.data/packed/latest.json'));
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

	var formatDate = function(date,timezone,format)
	{
		m_date= moment(date)
		return m_date.tz(timezone).format(format)
	}

	return{
		parseCriteria:parseCriteria,
		formatDate:formatDate
	}
})()

module.exports = Util