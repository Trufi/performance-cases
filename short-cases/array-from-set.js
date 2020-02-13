const Benchmark = require('benchmark');

function setup() {
    var set = new Set();
    for (var i = 0; i < 100; i++) {
        set.add(i);
    }
    var array;
}

const suite = new Benchmark.Suite();
suite
    .add('create array with Array.from', {
        setup,
        fn() {
            array = Array.from(set);
        },
    })
    .add('create array and push each set element', {
        setup,
        fn() {
            array = [];
            set.forEach((x) => array.push(x));
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
