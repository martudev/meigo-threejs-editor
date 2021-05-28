


export class Utf16Buffer {

    static ToString(buf) {
        const array = new Uint16Array(buf);
	    return String.fromCharCode.apply(null, array);
    }

    static ToBuffer(str) {
        // 2 bytes for each char
        const bytes = str.length *2;
        const buffer = new SharedArrayBuffer(bytes);
        const arrayBuffer = new Uint16Array(buffer);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            arrayBuffer[i] = str.charCodeAt(i);
        }
        return { array: arrayBuffer, buffer: buffer };
    }

    static EncodeObject(toCheck) {
        console.log(toCheck)
        var props = {};
        var obj = toCheck;
        var protoAdd = ''
        do {
            var objName = obj.constructor.name
            var isFirstTime = toCheck == obj ? true : false
            if (objName != 'Object') {
                if (!isFirstTime) protoAdd += `__proto__.`
                console.log(Object.getOwnPropertyNames(obj))
                Object.getOwnPropertyNames(obj).forEach((item) => {
                    console.log(item)
                    if (item == 'constructor') return
                    var key = null
                    key = `${protoAdd}${item}`
                    var splitArr = key.split('.')

                    var data = null
                    splitArr.forEach((split) => {
                        if (data != null) {
                            data = data[split]
                        } else {
                            data = toCheck[split]
                        }
                    })
                    var dataToPut = data
                    if (typeof dataToPut === 'function' && dataToPut != null) {
                        dataToPut = btoa(data)
                    }
                    if (typeof dataToPut === 'object' && dataToPut != null && !Array.isArray(dataToPut)) {
                        dataToPut = this.EncodeObject(dataToPut)
                    }
                    props[key] = dataToPut
                })
            }
        } while (obj = Object.getPrototypeOf(obj));

        return props
    }

    static DecodeObject(toCheck) {
        const obj = Object.create({})
        console.log(Object.keys(toCheck))
        Object.keys(toCheck).forEach((key) => {
            const toCheckEncoded = toCheck[key]
            if (typeof toCheckEncoded === 'string') {
                var base64Reg = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/
                const isBase64 = base64Reg.test(toCheckEncoded)
                if (isBase64) {
                    var atobObj = atob(toCheckEncoded)
                    var func = eval(`(function ${atobObj})`)
                    console.log(func)
                    console.log(key)


                    const splitarr = key.split('.')
                    var data = null
                    splitarr.forEach((split) => {
                        if (split == '__proto__') {
                            if (data != null) {
                                data = data[split]
                            } else {
                                data = obj[split]
                            }
                        } else {
                            data[split] = func
                        }
                    })
                } else {
                    obj[key] = toCheckEncoded
                }
            } else if(typeof toCheckEncoded === 'number') {
                obj[key] = toCheckEncoded
            } else if(typeof toCheckEncoded === 'object') {
                obj[key] = this.DecodeObject(toCheckEncoded)
            }
        })
        return obj
    }
}