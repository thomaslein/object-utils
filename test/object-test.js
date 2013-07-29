var should = require('should')
	, objectUtils = require('..')
	, inherit = objectUtils.inherit
	, inheritsFrom = objectUtils.inheritsFrom
	, bind = objectUtils.bind;

describe('object-utils', function() {

	describe('inherit', function() {
		before(function() {
			this.Parent = function() {};
			this.Child = function() {};
			this.Parent.prototype.foo = function() {
				return 'foo';
			};
			this.Parent.bar = 'bar';
			inherit(this.Child, this.Parent);
			this.child = new this.Child();
		});

		it('should allow Child to inherit a Parent\'s prototype method', function() {
			this.child.foo().should.eql('foo');
		});

		it('should copy own properties from Parent to Child', function() {
			this.Child.should.have.property('bar');
		});

		it('should store a reference to Parent\'s prototype as "__super__"', function() {
			this.Child.should.have.property('__super__');
			this.Child.__super__.should.eql(this.Parent.prototype);
		});
	});

	describe('inheritsFrom', function() {
		before(function() {
			this.Parent = function() {};
			this.Child = function() {};
			this.GrandChild = function() {};
			this.Other = function() {};
			inherit(this.Child, this.Parent);
			inherit(this.GrandChild, this.Child);
		});

		it('should return false if arguments passed are not Functions', function() {
			inheritsFrom({}, this.Parent).should.be.false;
		});

		it('should return false if passed constructors do not inherit from each other', function() {
			inheritsFrom(this.Other, this.Parent).should.be.false;
		});

		it('should return true if direct descendant constructors inherit from each other', function() {
			inheritsFrom(this.Child, this.Parent).should.be.true;
		});

		it('should return true if descendant constructors inherit from each other', function() {
			inheritsFrom(this.GrandChild, this.Parent).should.be.true;
		});
	});

	describe('bind', function() {
		it('should bind a function\'s context to a specific object', function() {
			var foo = function() { return this; }
				, bar = {};
			foo = bind(foo, bar);
			foo().should.eql(bar);
		});
	});
});