var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

/*
    Output:
    number .length x 14,018,310 ops/sec ±1.56% (87 runs sampled)
    array .length x 814,472,900 ops/sec ±1.32% (90 runs sampled)
    number Array.isArray x 51,928,132 ops/sec ±1.83% (85 runs sampled)
    array Array.isArray x 51,128,730 ops/sec ±1.24% (88 runs sampled)
    number typeof x 711,305,123 ops/sec ±4.14% (83 runs sampled)
    array typeof x 777,428,119 ops/sec ±1.93% (89 runs sampled)
*/

function setup() {
    var n = 5;
    var a = [1, 2, 3];
}

suite
    .add('number .length', {
        setup,
        fn() {
            n.length;
        }
    })
    .add('array .length', {
        setup,
        fn() {
            a.length;
        }
    })
    .add('number Array.isArray', {
        setup,
        fn() {
            Array.isArray(n);
        }
    })
    .add('array Array.isArray', {
        setup,
        fn() {
            Array.isArray(a);
        }
    })
    .add('number typeof', {
        setup,
        fn() {
            typeof n === 'number';
        }
    })
    .add('array typeof', {
        setup,
        fn() {
            typeof a === 'number';
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
