/**
 * Allow 'Child' Constructor to inherit from 'Parent', including 'own' properties
 * --from CoffeeScript boilerplate--
 * @param {Function} Child
 * @param {Function} Parent
 * @returns {Function}
 */
exports.inherit = function(Child, Parent) {
	//copy 'own' properties from Parent to Child
	for (var key in Parent) {
		if (Parent.hasOwnProperty(key)) {
			Child[key] = Parent[key];
		}
	}
	//proxy constructor function
	function Ctor() {
		this.constructor = Child; //set constructor property to point to Child
	}
	//proxy inherits from Parent's prototype (avoid Parent instance)
	Ctor.prototype = Parent.prototype;
	//Child inherits from proxy (requires an object, not function)
	Child.prototype = new Ctor();
	//store reference to Child's 'super'
	Child.__super__ = Parent.prototype;
	//return extended constructor function
	return Child;
};

/**
 * Determine if 'Child' Constructor inherits from 'Parent'
 * @param {Function} Child
 * @param {Function} Parent
 * @returns {Boolean}
 */
exports.inheritsFrom = function(Child, Parent) {
	if (typeof Child == 'function' && typeof Parent == 'function') {
		if (Child === Parent) return true;
		var descendant = Child.__super__;
		while (descendant) {
			if (descendant.constructor) {
				if (descendant.constructor === Parent) return true;
			}
			descendant = descendant.constructor.__super__;
		}
		return false;
	} else {
		log('inheritsFrom: not function', Child, Parent);
	}
};

/**
 * Bind a function 'fn' to a specific 'context'
 * --from CoffeeScript boilerplate--
 * @param {Function} fn
 * @param {Object} context
 */
exports.bind = function(fn, context) {
	return function() {
		return fn.apply(context, arguments);
	};
};
