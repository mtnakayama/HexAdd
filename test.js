'use strict';
QUnit.test('Test-Test', function(assert) {
    assert.ok( 1 == '1', 'Passed!');
});

QUnit.test('Offset Coord Distance 1', function(assert) {
    var start = new HexAdd.Coord(0, 0);
    var end = new HexAdd.Coord(1, 15);
    var dist = 9;
    var calcDist = start.distance(end);
    assert.ok(calcDist <= dist, 'Result: ' + calcDist + ', Actual: ' + dist + '.');
});

QUnit.test('Offset Coord Distance 2', function(assert) {
    var start = new HexAdd.Coord(3, 11);
    var end = new HexAdd.Coord(-1, 11);
    var dist = 8;
    var calcDist = start.distance(end);
    assert.ok(calcDist <= dist, 'Result: ' + calcDist + ', Actual: ' + dist + '.');
});

QUnit.test('Path Heuristic 1', function(assert) {
    var start = new HexAdd.Coord(1, 3);
    var end = new HexAdd.Coord(1, 0);
    var dist = 2;
    var heuristic = HexAdd.pathHeuristic(start, end);
    assert.ok(heuristic <= dist, 'Result: ' + heuristic + ', Actual: ' + dist + '.');
});

QUnit.test('Path Heuristic 2', function(assert) {
    var start = new HexAdd.Coord(0, 0);
    var end = new HexAdd.Coord(1, 15);
    var dist = 9;
    var heuristic = HexAdd.pathHeuristic(start, end);
    assert.ok(heuristic <= dist, 'Result: ' + heuristic + ', Actual: ' + dist + '.');
});

QUnit.test('Convert to Cubic (0,1)', function(assert) {
    var offset = new HexAdd.Coord(0, 1);
    var cubic = offset.cubic();
    assert.ok(cubic.x == 1 && cubic.y == -1 && cubic.z == 0, 'x: ' + cubic.x + ', y: ' + cubic.y + ', z: ' + cubic.z);
});
QUnit.test('Convert to Offset (2, -3, 1)', function(assert) {
    var cubic = new HexAdd.CubicCoord(2, -3, 1);
    var offset = cubic.offset();
    assert.ok(offset.col == 1 && offset.row == 4, 'col: ' + offset.col + ', row: ' + offset.row + '; Expected (1, 4)');
});

QUnit.test('Convert Both Ways 1', function(assert) {
    var max = 50;
    for(var x = 0; x < max; x++) {
        for(var y = 0; y < max; y++) {
            var offset = new HexAdd.Coord(x, y);
            var cubic = offset.cubic();
            var newOffset = cubic.offset();
            assert.ok(offset.col == newOffset.col && offset.row == newOffset.row, 'x: ' + x + ', y: ' + y);
        }
    }

});

/*
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
*/
