function cropX(imageData, { left = 0, right = 0 }) {
    const { data, width, height } = imageData;
    const dataLength = data.length;
    const newWidth = width - left - right;
    const rowLength = width * 4;
    const newRowLength = newWidth * 4;
    const leftCrop = left * 4;
    const newData = [];
    // loop through each row
    for (let x = 0; x < dataLength; x += rowLength) {
        const newRowStart = x + leftCrop;
        const newRowEnd = newRowStart + newRowLength;
        for (let i = newRowStart; i < newRowEnd; i += 4) {
            newData.push(data[i], data[i + 1], data[i + 2], data[i + 3]);
        }
    }
    return { data: newData, height, width: newWidth };
}
function cropY(imageData, { top = 0, bottom = 0 }) {
    const { data, width, height } = imageData;
    const rowLength = width * 4;
    const topIndex = top * rowLength;
    const bottomIndex = bottom * rowLength;
    const newHeight = height - top - bottom;
    const newDataEnd = data.length - bottomIndex;
    const newData = [];
    // save each index within the cropped area (avoid .slice() for performance)
    for (let i = topIndex; i < newDataEnd; i++) {
        newData.push(data[i]);
    }
    return { data: newData, height: newHeight, width };
}
function toNumber(options) {
    return Object.fromEntries(Object.entries(options).map(([key, value]) => [key, Number(value || 0)]));
}
export default function cropImageData(imageData, cropOptions) {
    const { top, right, bottom, left } = toNumber(cropOptions);
    if (imageData.height < top + bottom || imageData.width < left + right) {
        return new ImageData(1, 1);
    }
    let newImageData = {
        data: imageData.data,
        width: imageData.width,
        height: imageData.height,
    };
    if (top || bottom) {
        newImageData = cropY(newImageData, { top, bottom });
    }
    if (left || right) {
        newImageData = cropX(newImageData, { left, right });
    }
    const { data, height, width } = newImageData;
    return new ImageData(Uint8ClampedArray.from(data), width, height);
}
