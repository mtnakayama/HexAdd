/**
 * 
 */
function HexAdd(playField){ //Constructor
	'use strict';
	this.playField = $(playField);
	
	var rows = 10;
	var columns = 5;
	this.setupPlayField(rows, columns);
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
			//cell.value = HexAdd.randomInt(0, 10);
			//columnItem.attr('data-column', col);
			//columnItem.attr('data-cell-number', cellNum);
			columnItem.click({self: this, cell: cell}, this.cellClick);
			rowList.append(columnItem);
			cellNum++;
			this.cells[i][col] = cell;
		}
	}
	console.log(this.cells);
}

HexAdd.prototype.cellClick = function(evt){
	'use strict';
	var self = evt.data.self; //self is the HexAdd object
	var cell = evt.data.cell;
	$(this).addClass('cell-selected');
	console.log(self)
	var coord = self.getCellCoord(this);
	console.log(self.getCellValue(this));
	console.log(cell);
}

HexAdd.randomInt = function(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min)) + min;
}