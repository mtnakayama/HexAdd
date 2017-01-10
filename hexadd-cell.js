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
	if(value == 0) {
		value = null;
	}
	this._value = value;
	$(this.element).text(value)
}

HexAdd.Cell.prototype.select = function(bool) {
	if(bool === false) {
		$(this.element).removeClass('cell-selected');
	} else {
		$(this.element).addClass('cell-selected');
	}
}

HexAdd.Cell.prototype.move = function(destCell) {
	if(destCell.value == null) { //make sure destination is empty.
	}
}

HexAdd.Cell.prototype.copyFromCell = function(sourceCell) {
	'use strict';
	this.value = sourceCell.value;
}

HexAdd.Cell.prototype.isEmpty = function() {
	
}