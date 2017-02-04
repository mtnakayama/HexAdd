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
    console.log(this.cubic());
    return this.cubic().distance(dest.cubic());
}

/* Code for axial system.
HexAdd.Coord.prototype.northeast = function() {
    return new HexAdd.Coord(this.col + 1, this.row - 1);
}
HexAdd.Coord.prototype.northwest = function() {
    return new HexAdd.Coord(this.col, this.row - 1);
}
HexAdd.Coord.prototype.southeast = function() {
    return new HexAdd.Coord(this.col, this.row + 1);
}
HexAdd.Coord.prototype.southwest = function() {
    return new HexAdd.Coord(this.col - 1, this.row + 1);
}
HexAdd.Coord.prototype.east = function() {
    return new HexAdd.Coord(this.col + 1, this.row);
}
HexAdd.Coord.prototype.west = function() {
    return new HexAdd.Coord(this.col - 1, this.row);
} */
HexAdd.Coord.prototype.to = function(direction) {
    if(direction == 'northeast') {
        return this.northeast();
    } else if(direction == 'northwest') {
        return this.northwest();
    } else if(direction == 'southeast') {
        return this.southeast();
    } else if(direction == 'southwest') {
        return this.southwest();
    } else if(direction == 'east') {
        return this.east();
    } else if(direction == 'west') {
        return this.west();
    }
}

HexAdd.CubicCoord = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

HexAdd.CubicCoord.prototype.offset = function() {
    /* Convert cubic back to offset coordinates. */
    var col = (this.x - (this.x & 1)) / 2;
    var row = this.z * 2 + this.x;
    return new HexAdd.Coord(col, row);
}
HexAdd.CubicCoord.prototype.distance = function(dest) {
    /* Calculate Distance between `this` and `dest`. */
    return (Math.abs(this.x - dest.x) + Math.abs(this.y - dest.y) + Math.abs(this.z - dest.z)) / 2;
}
