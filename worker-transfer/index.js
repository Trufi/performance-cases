const worker = new Worker('./worker.js');
const stats = new Sampling();

const cases = ['simple', 'packed', 'packedOneBuffer', 'simpleCurvable', 'packedCurvable'];
let caseIndex = -1;

let iterationCount = 0;
let iterationTimeStart = 0;

function iteration(type) {
    iterationTimeStart = performance.now();
    worker.postMessage({type});
}

function next(type, data) {
    stats.add(type, performance.now() - iterationTimeStart);
    iterationCount++;

    if (iterationCount < SAMPLING_LENGTH) {
        iteration(type);
    } else {
        console.log(stats.getText());
        console.log(data);
        console.groupEnd('Test case: ' + cases[caseIndex]);
        startNextCase();
    }
}

function startNextCase() {
    caseIndex++;

    if (caseIndex < cases.length) {
        iterationCount = 0;

        console.group('Test case: ' + cases[caseIndex]);
        setTimeout(() => {
            stats.reset();
            iteration(cases[caseIndex]);
        }, 1500);
    }
}

worker.onmessage = (ev) => {
    const type = ev.data.type;

    switch (type) {
        case 'simple':
            next(type, ev.data.data);
            break;

        case 'packed': {
            const objects = [];
            const packed = ev.data.data;
            for (let i = 0; i < packed.length; i++) {
                const source = {
                    arr: new Float32Array(packed[i]),
                    offset: 0
                };
                objects.push(unpack(source));
            }

            next(type, objects);
            break;
        }

        case 'packedOneBuffer': {
            const source = {
                arr: new Float32Array(ev.data.data),
                offset: 0
            };
            const objects = [];
            for (let i = 0; i < OBJECTS_COUNT; i++) {
                objects.push(unpack(source));
            }

            next(type, objects);
            break;
        }

        case 'simpleCurvable':
            next(type, ev.data.data);
            break;

        case 'packedCurvable': {
            const source = {
                arr: new Float32Array(ev.data.data),
                offset: 0
            };
            const objects = [];
            for (let i = 0; i < OBJECTS_COUNT; i++) {
                objects.push(unpackCurvable(source));
            }

            next(type, objects);
            break;
        }
    }
}

setTimeout(() => {
    startNextCase();
}, 1000);

function unpack(source) {
    return {
        color: source.arr[source.offset++],
        background: source.arr[source.offset++],
        width: source.arr[source.offset++],
        length: source.arr[source.offset++],
        border: source.arr[source.offset++],
        borderWidth: source.arr[source.offset++],
        borderColor: source.arr[source.offset++],
        minWidth: source.arr[source.offset++],
        maxWidth: source.arr[source.offset++],
        backgroundColor: source.arr[source.offset++],
        backgroundPosition: source.arr[source.offset++],
        backgroundRepeat: source.arr[source.offset++],
        display: source.arr[source.offset++],
        zIndex: source.arr[source.offset++]
    };
}

function unpackCurvable(source) {
    const obj = {};

    for (let j = 0; j < FIELDS_COUNT; j++) {
        const key = keys[j];
        const length = source.arr[source.offset++];

        if (length === 0) {
            obj[key] = source.arr[source.offset++];
        } else {
            const curve = [];
            for (let k = 0; k < length; k++) {
                const triplet = [
                    source.arr[source.offset++],
                    source.arr[source.offset++],
                    source.arr[source.offset++]
                ];
                curve.push(triplet);
            }
            obj[key] = curve;
        }
    }

    return obj;
}
