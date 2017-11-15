const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

function setup() {
    var a = 42949672;
    var b = -123545566;
    var c = 2345464;
    var d = 345859334;
    var e = -54353;
    var f = 976461235;
    var g = 235465;
    var h = 3594353;
    var i = 1246;
    var j = 949392123;
    var k = -4359954;
    var l = 32;
    var m = 85737532;
    var n = 294967296
}
suite
    .add('.toString()', {
        setup,
        fn() {
            a.toString() + '$' +
            b.toString() + '$' +
            c.toString() + '$' +
            d.toString() + '$' +
            e.toString() + '$' +
            f.toString() + '$' +
            g.toString() + '$' +
            h.toString() + '$' +
            i.toString() + '$' +
            j.toString() + '$' +
            k.toString() + '$' +
            l.toString() + '$' +
            m.toString() + '$' +
            n.toString();
        }
    })
    .add('.toString(36)', {
        setup,
        fn() {
            a.toString(36) + '$' +
            b.toString(36) + '$' +
            c.toString(36) + '$' +
            d.toString(36) + '$' +
            e.toString(36) + '$' +
            f.toString(36) + '$' +
            g.toString(36) + '$' +
            h.toString(36) + '$' +
            i.toString(36) + '$' +
            j.toString(36) + '$' +
            k.toString(36) + '$' +
            l.toString(36) + '$' +
            m.toString(36) + '$' +
            n.toString(36);
        }
    })
    .add('String(x)', {
        setup,
        fn() {
            String(a) + '$' +
            String(b) + '$' +
            String(c) + '$' +
            String(d) + '$' +
            String(e) + '$' +
            String(f) + '$' +
            String(g) + '$' +
            String(h) + '$' +
            String(i) + '$' +
            String(j) + '$' +
            String(k) + '$' +
            String(l) + '$' +
            String(m) + '$' +
            String(n);
        }
    })
    .add('concat', {
        setup,
        fn() {
            a + '$' +
            b + '$' +
            c + '$' +
            d + '$' +
            e + '$' +
            f + '$' +
            g + '$' +
            h + '$' +
            i + '$' +
            j + '$' +
            k + '$' +
            l + '$' +
            m + '$' +
            n;
        }
    })
    .add('join', {
        setup,
        fn() {
            [a, b, c, d, e, f, g, h, i, j, k, l, m, n].join('$');
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({async: true});
