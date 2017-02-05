'use strict';
QUnit.test('Test-Test', function(assert) {
    assert.ok( 1 == '1', 'Passed!');
});

QUnit.test('Coord Equality', function (assert) {
    var first = new HexAdd.Coord(5, 8);
    var second = new HexAdd.Coord(5, 8);
    assert.ok(first.eq(second));
    assert.ok(second.eq(first));
});

QUnit.test('Coord Move North', function (assert) {
    var coord = new HexAdd.Coord(7, 4);
    var newCoord = coord.north();
    console.log(newCoord);
    assert.ok(newCoord.col == 7 && newCoord.row == 2);
    assert.ok(newCoord.eq(coord.to('north')));
});

QUnit.test('Coord Move South', function (assert) {
    var coord = new HexAdd.Coord(7, 4);
    var newCoord = coord.south();
    console.log(newCoord);
    assert.ok(newCoord.col == 7 && newCoord.row == 6);
    assert.ok(newCoord.eq(coord.to('south')));
});
QUnit.test('Coord Move Northeast', function (assert) {
    var coord = new HexAdd.Coord(4, 7);
    var newCoord = coord.northeast();
    assert.ok(newCoord.col == 5 && newCoord.row == 6);
    assert.ok(newCoord.eq(coord.to('northeast')));

    var coord = new HexAdd.Coord(3, 4);
    var newCoord = coord.northeast();
    assert.ok(newCoord.col == 3 && newCoord.row == 3);
});

QUnit.test('Coord Move Southwest', function (assert) {
    var coord = new HexAdd.Coord(1, 0);
    var newCoord = coord.southwest();
    assert.ok(newCoord.col == 0 && newCoord.row == 1);
    assert.ok(newCoord.eq(coord.to('southwest')));

    var coord = new HexAdd.Coord(2, 5);
    var newCoord = coord.southwest();
    assert.ok(newCoord.col == 2 && newCoord.row == 6);
});

QUnit.test('Coord Move Southeast', function (assert) {
    var coord = new HexAdd.Coord(1, 6);
    var newCoord = coord.southeast();
    assert.ok(newCoord.col == 1 && newCoord.row == 7);
    assert.ok(newCoord.eq(coord.to('southeast')));

    var coord = new HexAdd.Coord(1, 5);
    var newCoord = coord.southeast();
    assert.ok(newCoord.col == 2 && newCoord.row == 6);
});

QUnit.test('Coord Move Northwest', function (assert) {
    var coord = new HexAdd.Coord(3, 6);
    var newCoord = coord.northwest();
    assert.ok(newCoord.col == 2 && newCoord.row == 5);
    assert.ok(newCoord.eq(coord.to('northwest')));

    var coord = new HexAdd.Coord(3, 5);
    var newCoord = coord.northwest();
    assert.ok(newCoord.col == 3 && newCoord.row == 4);
});

QUnit.test('Coord Neighbors', function(assert) {
    var center = new HexAdd.Coord(2, 2);
    var neighbors = center.neighbors();
    assert.ok(neighbors[0].eq(new HexAdd.Coord(2, 0)));
    assert.ok(neighbors[1].eq(new HexAdd.Coord(2, 1)));
    assert.ok(neighbors[2].eq(new HexAdd.Coord(2, 3)));
    assert.ok(neighbors[3].eq(new HexAdd.Coord(2, 4)));
    assert.ok(neighbors[4].eq(new HexAdd.Coord(1, 3)));
    assert.ok(neighbors[5].eq(new HexAdd.Coord(1, 1)));

});

QUnit.test('CubicCoord Equality', function(assert) {
    var first = new HexAdd.CubicCoord(9, 2, 5);
    var second = new HexAdd.CubicCoord(9, 2, 5);
    assert.ok(first.eq(second));
    assert.ok(second.eq(first));
})

QUnit.test('Convert to Cubic (0,1)', function(assert) {
    var offset = new HexAdd.Coord(0, 1);
    var cubic = offset.cubic();
    assert.ok(cubic.x == 1 && cubic.y == -1 && cubic.z == 0, 'x: ' + cubic.x + ', y: ' + cubic.y + ', z: ' + cubic.z);
});

QUnit.test('Convert to Offset (2, -3, 1)', function(assert) {
    var cubic = new HexAdd.CubicCoord(2, -3, 1);
    var offset = cubic.convert();
    assert.ok(offset.col == 1 && offset.row == 4, 'col: ' + offset.col + ', row: ' + offset.row + '; Expected (1, 4)');
});

QUnit.test('Convert Both Ways 1', function(assert) {
    var max = 50;
    for(var x = 0; x < max; x++) {
        for(var y = 0; y < max; y++) {
            var offset = new HexAdd.Coord(x, y);
            var cubic = offset.cubic();
            var newOffset = cubic.convert();
            assert.ok(offset.col == newOffset.col && offset.row == newOffset.row, 'x: ' + x + ', y: ' + y);
        }
    }
});

QUnit.test('Offset Coord Distance 1', function(assert) {
    var start = new HexAdd.Coord(0, 0);
    var end = new HexAdd.Coord(1, 15);
    var dist = 9;
    var calcDist = start.distance(end);
    assert.ok(calcDist == dist, 'Result: ' + calcDist + ', Actual: ' + dist + '.');
});

QUnit.test('Offset Coord Distance 2', function(assert) {
    var start = new HexAdd.Coord(3, 11);
    var end = new HexAdd.Coord(-1, 11);
    var dist = 8;
    var calcDist = start.distance(end);
    assert.ok(calcDist == dist, 'Result: ' + calcDist + ', Actual: ' + dist + '.');
});

QUnit.test('Path Heuristic 1', function(assert) {
    var start = new HexAdd.Coord(1, 3);
    var end = new HexAdd.Coord(1, 0);
    var dist = 2;
    var heuristic = HexAdd.prototype.pathHeuristic(start, end);
    assert.ok(heuristic <= dist, 'Result: ' + heuristic + ', Actual: ' + dist + '.');
});

QUnit.test('Path Heuristic 2', function(assert) {
    var start = new HexAdd.Coord(0, 0);
    var end = new HexAdd.Coord(1, 15);
    var dist = 9;
    var heuristic = HexAdd.prototype.pathHeuristic(start, end);
    assert.ok(heuristic <= dist, 'Result: ' + heuristic + ', Actual: ' + dist + '.');
});
