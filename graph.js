'use strict';

HexAdd.Graph = function(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.initializeCells();
}

HexAdd.Graph.prototype.initializeCells = function() {
    this.cells = [];
    for(var col = 0; col < this.columns; col++) {
        this.cells[col] = [];
        for(var row = 0; row < this.rows; row++) {
            var cell = new HexAdd.Cell();
            this.cells[col][row] = cell
            cell.coord = new HexAdd.Coord(col, row);
        }
    }
}

HexAdd.Graph.prototype.in = function(coord) {
    return coord.col >= 0 && coord.row >= 0 && coord.col < this.columns && coord.row < this.rows;
};

HexAdd.Graph.prototype.neighborsOf = function(cell) {
    /* returns a list of neighbors */
    var neighborCoord = cell.coord.neighbors();
    var neighbors = [];
    for(var i = 0; i < neighborCoord.length; i++) {
        if(this.in(neighborCoord[i])){
            neighbors.push(this.at(neighborCoord[i]));
        }
    }
    return neighbors;
}

HexAdd.Graph.prototype.forEach = function(func, data) {
    /* calls func(cell, [data]) for each cell, `data` is optional */
    for(var col = 0; col < this.columns; col++) {
        for(var row = 0; row < this.rows; row++) {
            func(this.cells[col][row], data);
        }
    }
}

HexAdd.Graph.prototype.at = function() {
    /*
    Usage:
    graphObject.at(coordObject)
    graphObject.at(col, row)
    graphObject.at(cubicCoordObject)
    */
    if(arguments[0] instanceof HexAdd.Coord) {
        var coord = arguments[0];
        return this.cells[coord.col][coord.row];
    } else if (arguments[0] instanceof HexAdd.CubicCoord) {
        // convert to Coord object and call again.
        return this.at(arguments[0].convert());
    } else if (arguments.length == 2) {
        return this.cells[arguments[0]][arguments[1]];
    } else {
        throw new TypeError("Unknown arguments.");
        console.log(arguments);
    }
}

HexAdd.Graph.prototype.randomCell = function() { //gets random empty cell
    var cell;
    var row;
    var col;
    do {
        row = HexAdd.randomInt(0, this.rows);
        col = HexAdd.randomInt(0, this.columns);
        cell = this.at(col, row);
        var cellValue = cell.value;
    } while (cellValue);
    return cell;
}
