const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

/*
    Output:
    for x 975,979 ops/sec ±1.93% (79 runs sampled)
    forEach x 416,829 ops/sec ±1.95% (81 runs sampled)
    Fastest is for
*/

function setup() {
    const random = (() => {
        let seed = 15;
        return () => {
            seed = seed * 16807 % 2147483647;
            return (seed - 1) / 2147483646;
        };
    })();

    const array = [];
    for (let i = 0; i < 100; i++) {
        array.push(Math.round(random() * 1e5));
    }
}

suite
    .add('for', {
        setup,
        fn() {
            let i = 0;
            for (let j = 0; j < array.length; j++) {
                i += array[j];
            }
        }
    })
    .add('forEach', {
        setup,
        fn() {
            let i = 0;
            array.forEach(x => i += x);
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
