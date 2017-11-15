const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

function setup() {
    var x = 42949672;
}

suite
    .add('x.toString()', {
        setup,
        fn() {
            x.toString();
        }
    })
    .add('x.toString(36)', {
        setup,
        fn() {
            x.toString(36);
        }
    })
    .add('String(x)', {
        setup,
        fn() {
            String(x);
        }
    })
    .add('\'\' + x', {
        setup,
        fn() {
            '' + x;
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({async: true});
