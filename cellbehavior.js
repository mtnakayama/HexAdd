'use strict';

HexAdd.prototype.findMatchingNeighbors = function(cell) {
    //console.log(cell);
    this.graph.forEach(function(cell){
        cell.clearNeighborData();
    })
    var matchValue = cell.value;

    //console.log('matchValue', matchValue);
    if(!matchValue) {
        return [];
    }
    var neighborList = [];
    var openSet = [];
    openSet.push(cell);

    while(openSet.length > 0) {
        //console.log('openSet', openSet);
        var currentNode = openSet.pop();
        currentNode.evaluatedAsNeighbor = true;
        if(currentNode.value == matchValue) {
            neighborList.push(currentNode);
            var neighbors = this.graph.neighborsOf(currentNode);
            for(var i = 0; i < neighbors.length; i++) {
                var neighNode = neighbors[i];
                if(!neighNode.evaluatedAsNeighbor) {
                    openSet.push(neighNode);
                }
            }
        }

    }
    return neighborList;
}
