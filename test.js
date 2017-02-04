'use strict';
QUnit.test('Test-Test', function(assert) {
    assert.ok( 1 == '1', 'Passed!');
});

QUnit.test('Path Heuristic A', function(assert) {
    var start = new HexAdd.Coord(0, 0);
    var end = new HexAdd.Coord(1, 15);
    var dist = 9;
    var heuristic = HexAdd.pathHeuristic(start, end);
    assert.ok(heuristic <= dist, 'Result: ' + heuristic + ', Actual: ' + dist + '.');
});
