const Benchmark = require('benchmark');

function setup() {
    var obj = {
        width: 1,
        height: 2,
        opacity: 3,
        background: 4,
        lineHeight: 5,
        position: 6,
        font: 7,
        textAlign: 8,
        color: 9,
        display: 10,
        fontSize: 11,
        left: 12,
        top: 13,
    };
    var fields = [
        'width',
        'height',
        'opacity',
        'background',
        'lineHeight',
        'position',
        'font',
        'textAlign',
        'color',
        'display',
        'fontSize',
        'left',
        'top',
    ];
    var clone;
}

const suite = new Benchmark.Suite();
suite
    .add('object spread', {
        setup,
        fn() {
            clone = { ...obj, display: 22 };
        },
    })
    .add('object assign', {
        setup,
        fn() {
            clone = {};
            Object.assign(clone, obj);
            clone.display = 22;
        },
    })
    .add('for in copy', {
        setup,
        fn() {
            clone = {};
            for (const key in obj) {
                clone[key] = obj[key];
            }
            clone.display = 22;
        },
    })
    .add('for by keys copy', {
        setup,
        fn() {
            clone = {};
            for (let i = 0; i < fields.length; i++) {
                const key = fields[i];
                clone[key] = obj[key];
            }
            clone.display = 22;
        },
    })
    .add('bulk copy', {
        setup,
        fn() {
            clone = {
                width: obj.width,
                height: obj.height,
                opacity: obj.opacity,
                background: obj.background,
                lineHeight: obj.lineHeight,
                position: obj.position,
                font: obj.font,
                textAlign: obj.textAlign,
                color: obj.color,
                display: 22,
                fontSize: obj.fontSize,
                left: obj.left,
                top: obj.top,
            };
        },
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
    .run();
