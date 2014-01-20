/**
 * Allow 'Child' Constructor to inherit from 'Parent', including 'own' properties
 * --from CoffeeScript boilerplate--
 * @param {Function} Child
 * @param {Function} Parent
 * @returns {Function}
 */
exports.inherit = function (Child, Parent) {
	// Copy 'own' properties from Parent to Child
	for (var key in Parent) {
		if (Parent.hasOwnProperty(key)) {
			Child[key] = Parent[key];
		}
	}
	// Proxy constructor function
	function Ctor() {
		// Set constructor property to point to Child
		this.constructor = Child;
		// Store reference to Child's 'super'
		this.super = Parent.prototype;
	}
	// Proxy inherits from Parent's prototype (avoid Parent instance)
	Ctor.prototype = Parent.prototype;
	// Child inherits from proxy (requires an object, not function)
	Child.prototype = new Ctor();
	// Store reference to Child's 'super'
	Child.super = Parent.prototype;
	// Return extended constructor function
	return Child;
};

/**
 * Determine if 'Child' Constructor inherits from 'Parent'
 * @param {Function} Child
 * @param {Function} Parent
 * @returns {Boolean}
 */
exports.inheritsFrom = function (Child, Parent) {
	if (typeof Child == 'function' && typeof Parent == 'function') {
		if (Child === Parent) return true;
		var descendant = Child.super;
		while (descendant) {
			if (descendant.constructor) {
				if (descendant.constructor === Parent) return true;
			}
			descendant = descendant.constructor.super;
		}
	}
	return false;
};

/**
 * Bind a function 'fn' to a specific 'context'
 * --from CoffeeScript boilerplate--
 * @param {Function} fn
 * @param {Object} context
 */
exports.bind = function (fn, context) {
	return function() {
		return fn.apply(context, arguments);
	};
};