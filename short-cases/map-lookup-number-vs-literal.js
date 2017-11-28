const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

function setup() {
    var mapNumber = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
    ];

    var mapString = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 10,
        k: 11,
        l: 12,
        m: 13,
        n: 14,
    };

    var i = 0;
}

suite
    .add('mapNumber', {
        setup,
        fn() {
            i += mapNumber[0] +
                mapNumber[1] +
                mapNumber[2] +
                mapNumber[3] +
                mapNumber[4] +
                mapNumber[5] +
                mapNumber[6] +
                mapNumber[7] +
                mapNumber[8] +
                mapNumber[9] +
                mapNumber[10] +
                mapNumber[11] +
                mapNumber[12] +
                mapNumber[13];
        }
    })
    .add('mapString', {
        setup,
        fn() {
            i += mapString['a'] +
                mapString['b'] +
                mapString['c'] +
                mapString['d'] +
                mapString['e'] +
                mapString['f'] +
                mapString['g'] +
                mapString['h'] +
                mapString['i'] +
                mapString['j'] +
                mapString['k'] +
                mapString['l'] +
                mapString['m'] +
                mapString['n'];
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
