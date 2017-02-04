HexAdd.findPath = function(start, end, graph) {

}

HexAdd.pathHeuristic = function(start, end) {
    /* should return a value less than or equal to the actual distance between the two points*/
    return Math.sqrt(Math.pow((end.col - start.col), 2) + Math.pow(Math.abs(end.row - start.row), 2));
}
