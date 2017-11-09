const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

suite
    .add('object set fields while creating', {
        fn() {
            var obj = {
                width: 1,
                height: 2,
                opacity: 3,
                background: 4,
                lineHeight: 5,
            };
        }
    })
    .add('object set fields after creating', {
        fn() {
            var obj = {};
            obj.width = 1;
            obj.height = 2;
            obj.opacity = 3;
            obj.background = 4;
            obj.lineHeight = 5;
        }
    })
    .add('set fields by function while creating', {
        setup() {
            var create = function(width, height, opacity, background, lineHeight) {
                return {
                    width: width,
                    height: height,
                    opacity: opacity,
                    background: background,
                    lineHeight: lineHeight
                };
            }
        },
        fn() {
            var obj = create(1, 2, 3, 4, 5);
        }
    })
    .add('set fields by function after creating', {
        setup() {
            var create = function(width, height, opacity, background, lineHeight) {
                var obj = {};
                obj.width = width;
                obj.height = height;
                obj.opacity = opacity;
                obj.background = background;
                obj.lineHeight = lineHeight;
                return obj;
            }
        },
        fn() {
            var obj = create(1, 2, 3, 4, 5);
        }
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({async: true});
