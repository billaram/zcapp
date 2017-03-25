var expect = require('chai').expect
var Util = require('../src/util')

describe('Parsing Criteria Util',function(){
	it('should parse plain object into criteria string',function(){
		var criteria ={
			test:'criteria',
			anothervalue:"sample value",
			number:1,
			bool:true
		}
		var expectedString = 'test=="criteria" && anothervalue=="sample value" && number=="1" && bool=="true"'
		expect(Util.parseCriteria(criteria)).to.equal(expectedString);
	})

	it('should parse operator object into criteria string',function(){
		var criteria ={
			test:'criteria',
			anothervalue:{
				op:"<=",
				value:"i m greater"
			},
			number:1,
			bool:true
		}
		var expectedString = 'test=="criteria" && anothervalue<="i m greater" && number=="1" && bool=="true"'
		expect(Util.parseCriteria(criteria)).to.equal(expectedString);
	})
	
})
describe('Get given date should be in desired format',function(){
	it('parse date into dd-mmm-yyyy hh:mm:ss',function(){
		var actualdate = new Date('Sat Mar 25 2017 23:36:41 GMT+0530 (IST)');
		console.log(actualdate)
		expect(Util.formatDate(actualdate,'default')).to.equal('Sat Mar 25 2017 23:36:41')
	})
})