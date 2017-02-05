HexAdd.prototype.findPath = function(start, end) {
    /* start, end Cell */
    /* A* Algorithm */
    this.clearPathfindingData();
    function compareFScore(a, b) {
        //evaluation structured like this for NaN
        // just like a.fScore < infinity
        // a.fScore < b.fScore
        return !(a.fScore >= b.fScore);
    }
    openSet = new FastPriorityQueue(compareFScore);
    start.gScore = 0;
    start.fScore = this.pathHeuristic(start, end);
    openSet.add(start);
    while(!openSet.isEmpty()) {
        //console.log(openSet);
        currentNode = openSet.poll();
        //currentNode.element.css('background', 'pink');
        if(currentNode == end) {
            return this.reconstructPath(currentNode)
        }
        //closedSet.push(currentNode);
        currentNode.open = false;
        var neighbors = this.graph.neighborsOf(currentNode);
        //console.log(neighbors)
        for(var i = 0; i < neighbors.length; i++) {
            var neighNode = neighbors[i];

            neighNode.element.css('background', 'pink');
            window.setTimeout(function(elem){
                return function resetColor() {
                    //console.log('hi')
                    elem.css('background', '');
                }
            }(neighNode.element), 500);


            if(neighNode.value) {
                continue; // neighbor is not a valid moving space
            }
            if(neighNode.open === false) {
                continue; // Ignore the neighbor which is already evaluated.
            }
            var tentativeGScore = currentNode.gScore + 1;
            if (neighNode.open && !(tentativeGScore < neighNode.gScore)) {
                //the evaluation is like this so that it evaluates correctly with NaN
                continue; //This is not a better path.
            }

            // This path is the best until now. Record it!
            neighNode.cameFrom = currentNode;
            neighNode.gScore = tentativeGScore;
            neighNode.fScore = neighNode.gScore + this.pathHeuristic(neighNode, end);
            //@BUG Priority Queue does not reorder if the fscore is updated.
            if(!neighNode.open) {
                openSet.add(neighNode);
                neighNode.open = true;
            }
        }

    }

    return false; //search unsuccessful
}

HexAdd.prototype.reconstructPath = function(endNode) {
    var path = [];
    var node = endNode;
    while(node) {
        path.push(node.coord)
        node = node.cameFrom;
    }
    return path.reverse();
}

HexAdd.prototype.clearPathfindingData = function() {
    this.graph.forEach(function(cell){
        cell.clearPathfindingData();
    })
}

HexAdd.prototype.pathHeuristic = function(start, end) {
    /* should return a value less than or equal to the actual distance between the two points*/
    return start.coord.distance(end.coord);
}
