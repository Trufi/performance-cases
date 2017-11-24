const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

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
    .add('for-in with Object.prototype.hasOwnProperty', {
        setup,
        fn() {
            let i = 0;
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
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
    .run({async: true});
