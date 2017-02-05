'use strict';

HexAdd.Coord = function(col, row) {
    /* Offset "odd-q" Hex Corrdinates, but with row and col switched */
    /*
    Layout:
    1: 1   2   3
    2:   1   2
    3: 1   2   3
    */
    this.row = row;
    this.col = col;
}

HexAdd.Coord.prototype.cubic = function() {
    /* Offset "odd-q" Hex Corrdinates, but with row and col switched */
    /* more info: http://www.redblobgames.com/grids/hexagons/ */
    var x = this.col * 2 + (this.row & 1);
    var z = (this.row - (this.row & 1)) / 2 - this.col;
    var y = (-x) - z;
    return new HexAdd.CubicCoord(x, y, z);
}

HexAdd.Coord.prototype.distance = function(dest) {
    //console.log(this.cubic());
    return this.cubic().distance(dest.cubic());
}

//We're moving clockwise.
HexAdd.Coord.prototype.north = function() {
    return new HexAdd.Coord(this.col, this.row - 2);
}
HexAdd.Coord.prototype.northeast = function() {
    var col = this.col + (this.row & 1);
    return new HexAdd.Coord(col, this.row - 1);
}
HexAdd.Coord.prototype.southeast = function() {
    var col = this.col + (this.row & 1);
    return new HexAdd.Coord(col, this.row + 1);
}
HexAdd.Coord.prototype.south = function() {
    return new HexAdd.Coord(this.col, this.row + 2);
}
HexAdd.Coord.prototype.southwest = function() {
    var col = this.col - ((this.row - 1) & 1);
    return new HexAdd.Coord(col, this.row + 1);
}
HexAdd.Coord.prototype.northwest = function() {
    var col = this.col - ((this.row - 1) & 1);
    return new HexAdd.Coord(col, this.row - 1);
}

HexAdd.Coord.prototype.neighbors = function() {
    var neighbors = [this.north(), this.northeast(), this.southeast(), this.south(),
    this.southwest(), this.northwest()];
    //console.log(neighbors);
    return neighbors;
}

HexAdd.Coord.prototype.to = function(direction) {
    if(direction == 'northeast') {
        return this.northeast();
    } else if(direction == 'northwest') {
        return this.northwest();
    } else if(direction == 'southeast') {
        return this.southeast();
    } else if(direction == 'southwest') {
        return this.southwest();
    } else if(direction == 'north') {
        return this.north();
    } else if(direction == 'south') {
        return this.south();
    }
}

HexAdd.Coord.prototype.eq = function(other) {
    return this.col == other.col && this.row == other.row;
}

HexAdd.CubicCoord = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}


HexAdd.CubicCoord.prototype.eq = function(other) {
    return this.x == other.x && this.y == other.y && this.z == other.z;
}

HexAdd.CubicCoord.prototype.convert = function() {
    /* Convert cubic back to offset coordinates. */
    var col = (this.x - (this.x & 1)) / 2;
    var row = this.z * 2 + this.x;
    return new HexAdd.Coord(col, row);
}

HexAdd.CubicCoord.prototype.distance = function(dest) {
    /* Calculate Distance between `this` and `dest`. */
    return (Math.abs(this.x - dest.x) + Math.abs(this.y - dest.y) + Math.abs(this.z - dest.z)) / 2;
}
