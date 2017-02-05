/**
 *
 */
'use strict';

function HexAdd(playField){ //Constructor
    'use strict';
    this.playField = $(playField);

    this.stateMachine = new HexAdd.StateMachine();

    this.rows = 10;
    this.columns = 5;
    this.graph = new HexAdd.Graph(this.columns, this.rows);
    this.setupPlayField(this.columns, this.rows);
    this.createCells(10);

    $(document).keydown(this, this.handleKeyPress)
}

HexAdd.prototype.handleKeyPress = function(evt) {
    var self = evt.data;
    var key = evt.which;
    if ((key >= KeyEnum['0'] && key <= KeyEnum['9']) || key == KeyEnum.p) {
        switch(key) {
            case KeyEnum.p:
            self.stateMachine.togglePlaceMode();
            break;
            case KeyEnum['0']:
            self.stateMachine.placeTile = null;
            break;
            case KeyEnum['1']:
            self.stateMachine.placeTile = 1;
            break;
            case KeyEnum['2']:
            self.stateMachine.placeTile = 2;
            break;
            case KeyEnum['3']:
            self.stateMachine.placeTile = 4;
            break;
        }
        self.updateHud();
    } else if (key == KeyEnum.n) {
        self.stateMachine.toggleNeighborMode();
        self.updateHud();
    }
}

HexAdd.CellNotEmptyException = function(message) {
    this.message = message;
    // Use V8's native method if available, otherwise fallback
    if ("captureStackTrace" in Error) {
        Error.captureStackTrace(this, HexAdd.CellNotEmptyException);
    } else {
        this.stack = (new Error()).stack;
    }
}

HexAdd.prototype.setupPlayField = function(){
    'use strict';
    //We can't use tables, due to old IE compatibility.
    this.hexGrid = $('<div class="hexadd-grid"></div>');
    this.playField.append(this.hexGrid);
    for(var row = 0; row < this.rows; row++){
        //Create ol do hold each row.
        var rowList = $('<ol></ol>');
        this.hexGrid.append(rowList);
        for(var col = 0; col < this.columns; col++) {
            //create li for each hexagon
            var columnItem = $('<li></li>');
            var cell = this.graph.cells[col][row]
            cell.element = columnItem;
            columnItem.click({self: this, cell: cell}, this.cellClick);
            rowList.append(columnItem);
        }
    }
    //console.log(this.cells);
    this.hudElement = $('<div class="hexadd-hud"></div>');
    this.playField.append(this.hudElement);
    this.hudElement.text('Hello world!');
}

HexAdd.prototype.updateHud = function() {
    if(this.stateMachine.mode == 'normal') {
        this.hudElement.text('HexAdd');
    } else if (this.stateMachine.mode == 'neighbor') {
        this.hudElement.text('Neighbor Mode');
    } else if (this.stateMachine.mode == 'place'){
        this.hudElement.text('Place: ' + this.stateMachine.placeTile);
    }
}

HexAdd.prototype.createCells = function(amount) {
    for(var i=0; i < amount; i++) {
        this.graph.randomCell().value = Math.pow(2, HexAdd.randomInt(0, 4));
    }
}

HexAdd.prototype.moveCell = function(source, dest) {
    'use strict';
    var sourceCell = source;
    var destCell = dest;
    //console.log(sourceCell, destCell);
    //var sourceCell = this.cellAtCoord(sourceCoord);
    //var destCell = this.cellAtCoord(destCoord);
    if(destCell.value === null) {
        if(this.findPath(source, dest)){
            destCell.copyFromCell(sourceCell);
            sourceCell.value = null;
        } else {
            console.log('boop');
        }
    } else {
        throw new HexAdd.CellNotEmptyException();
    }
}

HexAdd.prototype.cellClick = function(evt){
    'use strict';
    var self = evt.data.self; //self is the HexAdd object
    var cell = evt.data.cell;
    //console.log(self);
    if(self.stateMachine.mode == 'normal') {
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
    } else if (self.stateMachine.mode == 'place') {
        cell.value = self.stateMachine.placeTile;
    } else if (self.stateMachine.mode == 'neighbor') {
        var cellNeighbors = self.graph.neighborsOf(cell);
        for(var i = 0; i < cellNeighbors.length; i++) {
            cellNeighbors[i].element.css('background', 'orange');
        }
    }
    //console.log(self)
    //console.log(cell);
}

HexAdd.randomInt = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
}
