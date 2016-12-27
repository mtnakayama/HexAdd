/**
 * 
 */

HexAdd.Cell = function(initObj) {
	'use strict';
	Object.defineProperty(this, 'value', {
		get: function() {return this._value},
		set: function(v) {return this.setValue(v);}
	});
	this.value = null;
	this.element = initObj.element;
	this.x = initObj.x;
	this.y = initObj.y;
}

HexAdd.Cell.prototype.setValue = function(value) {
	this._value = value;
	$(this.element).text(value)
}