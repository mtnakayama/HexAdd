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
	//We can't use tables, due to old IE compatibility.
	this.hexGrid = $('<div class="hexGrid"></div>');
	this.playField.append(this.hexGrid);
	
	for(var i = 0; i < rows; i++){
		//Create ol do hold each row.
		var rowList = $('<ol></ol>');
		rowList.attr('data-row', i);
		this.hexGrid.append(rowList);
		
		for(var col = 0; col < columns; col++) {
			//create li for each hexagon
			var columnItem = $('<li></li>');
			columnItem.attr('data-column', col);
			columnItem.text('hi');
			rowList.append(columnItem);
		}
	}
}

HexAdd.prototype.addClick = function(){
	
}

$(document).ready(function(){
	'use strict';
	window.hexAddGame = new HexAdd('#playField');
})