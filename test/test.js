var assert = require('assert'),
	expect = require('expect.js'),
	CodeBreaker = require('../CodeBreaker'),
	code = new CodeBreaker(),
	should = require('should'),
	supertest = require('supertest'),
	app = require('../app.js');

var request = supertest(app)

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

describe('GET /setSecret/:number', function() {
    it('should return code 200', function(done) {
        request.get('/setSecret/1234')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					       done();
  			    });
    });

    it('should return a Content-Type application/json', function(done) {
        request.get('/setSecret/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  					       done();
  			    });
    });

    it('should return a correct message Json Object', function(done) {
        request.get('/setsecret/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  		    		should.not.exist(err);
  		    		should.exist(res);
  		    		res.body.should.be.an.Object;
  		    		should.exist(res.body.message);
  		    		done();
  			    });
    });

});

describe('GET /guess/:number', function() {
    it('should return code 200', function(done) {
        request.get('/guess/1234')
            .expect(200)
            .end(function(err, res){
  		    		if (err) return done(err);
  					       done();
  			    });
    });

    it('should return a Content-Type application/json', function(done) {
        request.get('/guess/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  					       done();
  			    });
    });

    it('should return a correct result Json Object', function(done) {
        request.get('/guess/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  		    		should.not.exist(err);
  		    		should.exist(res);
  		    		res.body.should.be.an.Object;
  		    		should.exist(res.body.result);
  		    		done();
  			    });
    });

    it('should guess the correct number', function(done) {
        request.get('/guess/1234')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res){
  		    		if (err) return done(err);
  		    		should.not.exist(err);
  		    		should.exist(res);
  		    		res.body.should.be.an.Object;
  		    		should.exist(res.body.result);
              assert.equal('xxxx',res.body.result);
  		    		done();
  			    });
					});
});
