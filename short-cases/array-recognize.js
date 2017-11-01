const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

function setup() {
    const n = 5;
    const a = [1, 2, 3];
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
    .run({async: true});
