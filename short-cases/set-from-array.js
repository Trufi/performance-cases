const Benchmark = require('benchmark');

function setup() {
    var array = [];
    for (var i = 0; i < 100; i++) {
        array.push(i);
    }
}

const suite = new Benchmark.Suite();
suite
    .add('create set from array', {
        setup,
        fn() {
            var set = new Set(array);
        },
    })
    .add('create set and add array elements', {
        setup,
        fn() {
            var set = new Set();
            for (var i = 0; i < array.length; i++) {
                set.add(array[i]);
            }
        },
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .on('error', function(e) {
        console.log(e);
    })
    .run();
