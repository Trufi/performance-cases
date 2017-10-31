var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

/*
    Output:
    number .length x 14,565,867 ops/sec ±1.18% (90 runs sampled)
    array .length x 832,315,907 ops/sec ±1.41% (88 runs sampled)
    number .constructor === Array x 122,967,502 ops/sec ±1.52% (90 runs sampled)
    array .constructor === Array x 825,095,208 ops/sec ±1.11% (93 runs sampled)
    number instanceof Array x 826,161,478 ops/sec ±1.37% (92 runs sampled)
    array instanceof Array x 558,481,951 ops/sec ±0.92% (92 runs sampled)
    number Array.isArray x 54,587,556 ops/sec ±1.03% (91 runs sampled)
    array Array.isArray x 52,552,617 ops/sec ±2.48% (91 runs sampled)
    number typeof x 775,257,025 ops/sec ±1.23% (91 runs sampled)
    array typeof x 799,213,039 ops/sec ±1.22% (90 runs sampled)
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
    .add('number .constructor === Array', {
        setup,
        fn() {
            n.constructor === Array;
        }
    })
    .add('array .constructor === Array', {
        setup,
        fn() {
            a.constructor === Array;
        }
    })
    .add('number instanceof Array', {
        setup,
        fn() {
            n instanceof Array;
        }
    })
    .add('array instanceof Array', {
        setup,
        fn() {
            a instanceof Array;
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
