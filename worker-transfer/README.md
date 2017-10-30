Тесты производительности передачи массива объектов из воркеров.
Каждый объект есть пара: ключ-значение.
Каждое значение в простом случае имеет тип `number`, либо `Curvable = number | Array<[number, number, number]>`.

Список кейсов:
- Простые объекты со значениеями `number`:
    - `simple` – простая передача
    - `packed` – каждый объект предварительно запаковывается в свой `ArrayBuffer`, а на выходе распаковывается
    - `packedOneBuffer` – в отличие от предыдущего варианта, все объекты запаковываются в один `ArrayBuffer`
- Объекты со значениями имещие тип `Curvable`:
    - `simpleCurvable` – простая передача
    - `packedCurvable` – запаковка/распаковка объектов в `ArrayBuffer`

[Demo](https://trufi.github.com/performance-cases/worker-transfer)
