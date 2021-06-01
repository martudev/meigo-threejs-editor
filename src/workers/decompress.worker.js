import LZString from 'lz-string'


self.addEventListener('message', ({ data }) => {

    const decompressed = LZString.decompressFromUTF16(data)

    postMessage(decompressed);
})