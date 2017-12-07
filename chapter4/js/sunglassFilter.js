onmessage = function (e) {
    var imagedata = e.data,
        data = imagedata.data,
        length = data.length,
        width = imagedata.width;

    for (var i = 0; i < length; ++i) {
        if ((i + 1) % 4 !== 0) {
            if ((i + 4) % (width * 4) == 0) {
                data[i] = data[i - 4];
                data[i + 1] = data[i - 3];
                data[i + 2] = data[i - 2];
                data[i + 3] = data[i - 1];
                i += 4;
            } else {
                data[i] = 244 / 2 + 2 * data[i] - data[i + 4] - data[i + width * 4];
            }
        }
    }

    postMessage(imagedata);
}