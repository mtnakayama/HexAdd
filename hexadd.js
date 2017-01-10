/**
 * 
 */

function HexAdd(playField){ //Constructor
	'use strict';
	this.playField = $(playField);
	
	this.stateMachine = new HexAdd.StateMachine();
	
	var rows = 10;
	var columns = 5;
	this.setupPlayField(rows, columns);
}

HexAdd.CellNotEmptyException = function(message) {
    this.message = message;
    // Use V8's native method if available, otherwise fallback
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, HexAdd.CellNotEmptyException);
    else
        this.stack = (new Error()).stack;
}

HexAdd.Coord = function(row, col) {
	self.row = row;
	self.col = col;
}

HexAdd.prototype.setupPlayField = function(rows, columns){
	'use strict';
	//We can't use tables, due to old IE compatibility.
	this.hexGrid = $('<div class="hexGrid"></div>');
	this.playField.append(this.hexGrid);
	this.cells = [];
	var cellNum = 0;
	for(var i = 0; i < rows; i++){
		//Create ol do hold each row.
		this.cells[i] = [];
		var rowList = $('<ol></ol>');
		rowList.attr('data-row', i);
		this.hexGrid.append(rowList);
		
		for(var col = 0; col < columns; col++) {
			//create li for each hexagon
			var columnItem = $('<li></li>');
			var cellInit = {
					x: col,
					y: i,
					element: columnItem
			}
			var cell = new HexAdd.Cell(cellInit);
			cell.value = HexAdd.randomInt(0, 10);
			//columnItem.attr('data-column', col);
			//columnItem.attr('data-cell-number', cellNum);
			columnItem.click({self: this, cell: cell}, this.cellClick);
			rowList.append(columnItem);
			cellNum++;
			this.cells[i][col] = cell;
		}
	}
	//console.log(this.cells);
}

HexAdd.prototype.cellAtCoord = function(coord) {
	return this.cells[coord.row][coord.col];
}

HexAdd.prototype.moveCell = function(source, dest) {
	'use strict';
	var sourceCell = source;
	var destCell = dest;
	console.log(sourceCell, destCell);
	//var sourceCell = this.cellAtCoord(sourceCoord);
	//var destCell = this.cellAtCoord(destCoord);
	if(destCell.value === null) {
		destCell.copyFromCell(sourceCell);
		sourceCell.value = null;
	} else {
		throw new HexAdd.CellNotEmptyException();
	}
}

HexAdd.prototype.cellClick = function(evt){
	'use strict';
	var self = evt.data.self; //self is the HexAdd object
	var cell = evt.data.cell;
	//console.log(self);
	if(self.stateMachine.selectedCell == null) {
		self.stateMachine.selectedCell = cell;
		//cell.select();
	} else {
		try {
			self.moveCell(self.stateMachine.selectedCell, cell);
		} catch (e) {
			if(e instanceof HexAdd.CellNotEmptyException) {
				self.stateMachine.selectedCell = null;
			} else {
				throw e;
			}
		}
		//self.stateMachine.selectedCell.select(false);
		self.stateMachine.selectedCell = null;
	}
	//console.log(self)
	//console.log(cell);
}

HexAdd.randomInt = function(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
}