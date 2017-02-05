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
    if(initObj) {
        this.element = initObj.element;
    }
    //pathfinding data
    this.clearPathfindingData();
    Object.defineProperty(this, 'totalScore', {
        get: function() {return this.heuristicScore + this.costScore},
    });
}

HexAdd.Cell.prototype.setValue = function(value) {
    if(value == 0) {
        value = null;
    }
    this._value = value;
	this.update();
}

HexAdd.Cell.prototype.update = function() {
	/* updates html display */
	if(this.element) {
		$(this.element).text(this.value)
	}
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

HexAdd.Cell.prototype.clearPathfindingData = function() {
    this.cameFrom = null;
    this.heuristicScore = null;
    this.costScore = null;
}
