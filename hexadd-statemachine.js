HexAdd.StateMachine = function() {
	Object.defineProperty(this, 'selectedCell', {
		get: function() {return this._selectedCell},
		set: function(v) {return this.setSelectedCell(v);}
	});
	this._selectedCell = null;
}

HexAdd.StateMachine.prototype.setSelectedCell = function(cell) {
	'use strict';
	//console.log(this);
	if(this._selectedCell !== null) {
		this._selectedCell.select(false);
	}
	this._selectedCell = cell;
	if(cell !== null) {
		cell.select();
	}
}