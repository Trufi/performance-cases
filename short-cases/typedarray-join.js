const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

function setup() {
    var arr = new Float32Array([
        42949672,
        -123545566,
        2345464,
        345859334,
        -54353,
        976461235,
        235465,
        3594353,
        1246,
        949392123,
        -4359954,
        32,
        85737532,
        29496729
    ]);
}

suite
    .add('join', {
        setup,
        fn() {
            arr.join('$');
        }
    })
    .add('for', {
        setup,
        fn() {
            var str = '';
            for (let i = 0; i < arr.length; i++) {
                str += arr[i] + '$';
            }
        }
    })
    .add('Array.prototype.join', {
        setup,
        fn() {
            Array.prototype.join.call(arr, '$');
        }
    })
    .add('Array.from and join', {
        setup,
        fn() {
            Array.from(arr).join('$');
        }
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
    .run({async: true});
