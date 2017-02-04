HexAdd.findPath = function(start, end, graph) {

}

HexAdd.pathHeuristic = function(start, end) {
    /* should return a value less than or equal to the actual distance between the two points*/
    return start.distance(end);
}
