const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

/*
    Output:
    for-in x 84,376 ops/sec ±1.94% (85 runs sampled)
    for-in with hasOwnProperty x 46,895 ops/sec ±4.17% (77 runs sampled)
    Object.keys for x 41,671 ops/sec ±9.54% (61 runs sampled)
    Fastest is for-in
*/

function setup() {
    const random = (() => {
        let seed = 15;
        return () => {
            seed = seed * 16807 % 2147483647;
            return (seed - 1) / 2147483646;
        };
    })();

    function randomKey() {
        const length = Math.ceil(random() * 9);
        let key = '';
        for (let i = 0; i < length; i++) {
            const code = 97 + Math.round(random() * 25);
            key += String.fromCharCode(code);
        }
        return key;
    }

    const object = {};
    for (let i = 0; i < 100; i++) {
        object[randomKey()] = Math.round(random() * 1e5);
    }
}

suite
    .add('for-in', {
        setup,
        fn() {
            let i = 0;
            for (const key in object) {
                i += object[key];
            }
        }
    })
    .add('for-in with hasOwnProperty', {
        setup,
        fn() {
            let i = 0;
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    i += object[key];
                }
            }
        }
    })
    .add('Object.keys for', {
        setup,
        fn() {
            let i = 0;
            const keys = Object.keys(object);
            for (let j = 0; j < keys.length; j++) {
                i += object[keys[j]];
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
