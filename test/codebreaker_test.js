var assert = require('assert'),
	expect = require('expect.js'),
	CodeBreaker = require('../CodeBreaker'),
	code = new CodeBreaker(),
	should = require('should'),
	supertest = require('supertest'),
	app = require('../app.js');


beforeEach(function(){
	code.setRandNumber('5876');
})

describe('CodeBreaker', function() {
	describe('#tryCode()', function() {
		it('Test equal number', function() {
			assert.equal('xxxx', code.tryCode(code.getRandNumber()));
		});
		it('Should return null', function() {
			assert.equal(null, code.tryCode('abcd'));
		});
		it('Test number size too long', function() {
			assert.equal(null, code.tryCode('12345'));
		});
		it('Test number too short', function() {
			assert.equal(null, code.tryCode('123'));
		});
		it('Test incorrect number', function() {
			assert.equal('', code.tryCode('1234'));
		});
		it('Test at least one equal same position digit', function() {
			var result = [
				'x',
				'x_',
				'x__',
				'x___',
				'xx',
				'xx_',
				'xx__',
				'xxx',
				'xxx_'
			]
			expect(result).to.contain(code.tryCode('5123'));
		});
		it('Test equals all different position digits', function() {
			var result = [
				'_',
				'__',
				'___',
				'____'
			]
			expect(result).to.contain(code.tryCode('1235'));
		});
	});
});
