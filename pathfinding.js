HexAdd.prototype.findPath = function(start, end) {
    /* start, end coordinates */
    /* A* Algorithm */
    this.clearPathfindingData();
    function queueComparator(a, b) {
        return cellAt(a).totalScore < cellAt(b).totalScore;
    }
    //closedSet = new FastPrioriyQueue(queueComparator);
    openSet = new FastPrioriyQueue(queueComparator);
    while(!openSet.isEmpty()) {
        currentNode = openSet.poll();
        if(currentNode == end) {
            return this.reconstructPath(currentNode)
        }
        //closedSet.add(currentNode);

    }

}

HexAdd.prototype.reconstructPath = function(endNode) {
    
}

HexAdd.prototype.clearPathfindingData = function() {
    this.forEachCell(function(cell){
        cell.clearPathfindingData();
    })
}

HexAdd.prototype.pathHeuristic = function(start, end) {
    /* should return a value less than or equal to the actual distance between the two points*/
    return start.distance(end);
}
