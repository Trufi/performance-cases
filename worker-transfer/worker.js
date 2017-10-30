importScripts('./config.js');

const random = (() => {
    let seed = 15;
    return () => {
        seed = seed * 16807 % 2147483647;
        return (seed - 1) / 2147483646;
    };
})();

const objects = generateObjects();
const curveObjects = generateCurveObjects();

self.onmessage = (ev) => {
    const type = ev.data.type;

    switch (type) {
        case 'simple':
            self.postMessage({type, data: objects});
            break;

        case 'packed': {
            const packed = [];
            for (let i = 0; i < objects.length; i++) {
                const source = {
                    arr: new Float32Array(FIELDS_COUNT),
                    offset: 0
                };
                pack(source, objects[i]);
                packed.push(source.arr.buffer);
            }

            self.postMessage({type, data: packed});
            break;
        }

        case 'packedOneBuffer': {
            const source = {
                arr: new Float32Array(FIELDS_COUNT * OBJECTS_COUNT),
                offset: 0
            };

            for (let i = 0; i < objects.length; i++) {
                pack(source, objects[i]);
            }

            self.postMessage({
                type,
                data: source.arr.buffer
            }, [source.arr.buffer]);
            break;
        }

        case 'simpleCurvable': {
            self.postMessage({
                type,
                data: curveObjects
            });
            break;
        }

        case 'packedCurvable': {
            const source = {
                arr: new Float32Array(FIELDS_COUNT * OBJECTS_COUNT * 4 * 15),
                offset: 0
            };

            for (let i = 0; i < curveObjects.length; i++) {
                packedCurvable(source, curveObjects[i]);
            }

            const buffer = source.arr.buffer.slice(0, source.offset * 4);
            self.postMessage({
                type,
                data: buffer
            }, [buffer]);
            break;
        }
    }
};

function pack(source, object) {
    source.arr[source.offset++] = object.color;
    source.arr[source.offset++] = object.background;
    source.arr[source.offset++] = object.width;
    source.arr[source.offset++] = object.length;
    source.arr[source.offset++] = object.border;
    source.arr[source.offset++] = object.borderWidth;
    source.arr[source.offset++] = object.borderColor;
    source.arr[source.offset++] = object.minWidth;
    source.arr[source.offset++] = object.maxWidth;
    source.arr[source.offset++] = object.backgroundColor;
    source.arr[source.offset++] = object.backgroundPosition;
    source.arr[source.offset++] = object.backgroundRepeat;
    source.arr[source.offset++] = object.display;
    source.arr[source.offset++] = object.zIndex;
}

function packedCurvable(source, object) {
    for (let j = 0; j < FIELDS_COUNT; j++) {
        const curve = object[keys[j]];
        if (!Array.isArray(curve)) {
            source.arr[source.offset++] = 0;
            source.arr[source.offset++] = curve;
        } else {
            source.arr[source.offset++] = curve.length;
            for (let k = 0; k < curve.length; k++) {
                const triplet = curve[k];
                source.arr[source.offset++] = triplet[0];
                source.arr[source.offset++] = triplet[1];
                source.arr[source.offset++] = triplet[2];
            }
        }
    }
}

function generateObjects() {
    const result = [];

    for (let i = 0; i < OBJECTS_COUNT; i++) {
        const obj = {};
        for (let j = 0; j < keys.length; j++) {
            obj[keys[j]] = Math.round(random() * 1e5);
        }
        result.push(obj);
    }

    return result;
}

function generateCurveObjects() {
    const result = [];

    for (let i = 0; i < OBJECTS_COUNT; i++) {
        const obj = {};
        for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            const length = Math.round(random() * 10);
            if (length === 0) {
                obj[key] = Math.round(random() * 1e5);
            } else {
                const curve = [];
                for (let k = 0; k < length; k++) {
                    curve.push([
                        Math.round(random() * 10),
                        Math.round(random() * 1e5),
                        0
                    ]);
                }
                obj[key] = curve;
            }
        }
        result.push(obj);
    }

    return result;
}
