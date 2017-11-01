const Benchmark = require('benchmark');

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

const suite = new Benchmark.Suite();
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

const suite2 = new Benchmark.Suite();
suite2
    .add('for push to array', {
        setup,
        fn() {
            const res = [];
            for (let j = 0; j < array.length; j++) {
                res.push(array[j] * 2);
            }
        }
    })
    .add('map to array', {
        setup,
        fn() {
            const res = array.map(el => el * 2);
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({async: true});
