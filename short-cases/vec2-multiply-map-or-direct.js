const Benchmark = require('benchmark');

function setup() {
    var random = (function() {
        var seed = 15;
        return function() {
            seed = seed * 16807 % 2147483647;
            return (seed - 1) / 2147483646;
        };
    })();

    var array = [];
    for (var i = 0; i < 10000; i++) {
        array.push([random() * 1e5, random() * 1e5]);
    }

    var result;
}

const suite = new Benchmark.Suite();
suite
    .add('multiply each element by map', {
        setup,
        fn() {
            for (var i = 0; i < array.length; i++) {
                result = array[i].map(function(x) { return x * 2; });
            }
        }
    })
    .add('multiply each element directly', {
        setup,
        fn() {
            for (var i = 0; i < array.length; i++) {
                var el = array[i];
                result = [el[0] * 2, el[1] * 2];
            }
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
