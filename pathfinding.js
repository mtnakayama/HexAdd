HexAdd.findPath = function(start, end, graph) {
    closedSet = new FastPrioriyQueue();
    openSet = new FastPrioriyQueue();

}

HexAdd.prototype.clearPathfindingData = function() {
    this.forEachCell(function(cell){
        cell.clearPathfindingData();
    })
}

HexAdd.pathHeuristic = function(start, end) {
    /* should return a value less than or equal to the actual distance between the two points*/
    return start.distance(end);
}
