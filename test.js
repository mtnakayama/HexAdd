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

QUnit.test('Path Heuristic A', function(assert) {
    var start = new HexAdd.Coord(0, 4);
    var end = new HexAdd.Coord(1, 1);
    var dist = 3;
    var heuristic = HexAdd.pathHeuristic(start, end);
    assert.ok(heuristic <= dist, 'Result: ' + heuristic + ', Actual: ' + dist + '.');
});

QUnit.test('Coord Move Northeast', function (assert) {
    var coord = new HexAdd.Coord(0, 0);
    var newCoord = coord.northeast();
    assert.ok(newCoord.col == coord.col + 1 && newCoord.row == coord.row - 1);
});
QUnit.test('Coord Move Northwest', function (assert) {
    var coord = new HexAdd.Coord(0, 0);
    var newCoord = coord.northeast();
    assert.ok(newCoord.col == coord.col && newCoord.row == coord.row - 1);
})
QUnit.test('Coord Move Southeast', function (assert) {
    var coord = new HexAdd.Coord(0, 0);
    var newCoord = coord.northeast();
    assert.ok(newCoord.col == coord.col && newCoord.row == coord.row + 1);
})
QUnit.test('Coord Move Southwest', function (assert) {
    var coord = new HexAdd.Coord(0, 0);
    var newCoord = coord.northeast();
    assert.ok(newCoord.col == coord.col + 1 && newCoord.row == coord.row - 1);
})
QUnit.test('Coord Move Northeast', function (assert) {
    var coord = new HexAdd.Coord(0, 0);
    var newCoord = coord.northeast();
    assert.ok(newCoord.col == coord.col + 1 && newCoord.row == coord.row - 1);
})
QUnit.test('Coord Move Northeast', function (assert) {
    var coord = new HexAdd.Coord(0, 0);
    var newCoord = coord.northeast();
    assert.ok(newCoord.col == coord.col + 1 && newCoord.row == coord.row - 1);
})
QUnit.test('Coord Move Northeast', function (assert) {
    var coord = new HexAdd.Coord(0, 0);
    var newCoord = coord.northeast();
    assert.ok(newCoord.col == coord.col + 1 && newCoord.row == coord.row - 1);
})
