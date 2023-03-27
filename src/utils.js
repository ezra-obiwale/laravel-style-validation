import '@babel/polyfill';

export const arrayToObject = arr => {
    const obj = {};

    if (!Array.isArray(arr)) {
        return obj;
    }

    let key = null;

    arr.forEach(value => {
        if (!key) {
            key = value;
        } else {
            obj[key] = value;
            key = null;
        }
    });

    return obj;
};

export const chooseMessage = (customMessage, defaultMessage, replacements = {}, messageParser) => {
    if (customMessage === false) {
        return false;
    }

    if (customMessage === true) {
        customMessage = defaultMessage;
    }

    if (typeof messageParser === 'function') {
        return messageParser(`${ customMessage || defaultMessage }`, replacements);
    }

    return parseMessage(`${ customMessage || defaultMessage }`, replacements);
};

export const clone = obj => JSON.parse(JSON.stringify(obj));

export const eachInPath = function* (obj, path) {
    const eachObj = function* (eObj, ePath, startIndex = 0) {
        let index = ePath.indexOf('.*', startIndex);
        let arrPath = ePath.substr(startIndex, index++ - startIndex);
        let remPath = ePath.substr(++index);

        if (remPath.startsWith('.')) {
            remPath = remPath.substr(1);
        }

        if (arrPath.startsWith('.')) {
            arrPath = arrPath.substr(1);
        }

        const arr = getObjectPathValue(eObj, arrPath);

        if (!Array.isArray(arr)) {
            throw new Error(`${ arrPath } is not an array`);
        }

        const eachArr = function* (arr, nextPath, curPath, lastIndex) {
            while (arr.length) {
                const value = arr.shift();

                if (nextPath.startsWith('*')) { // value must be an array
                    if (Array.isArray(value)) {
                        let nPath = nextPath.substr(1);
                        let cPath = `${ curPath }.`;
                        let lIndex = lastIndex + 1;

                        if (nextPath.startsWith('*.')) {
                            nPath = nextPath.substr(2);
                            cPath = `${ cPath }*`;
                            lIndex++;
                        }

                        for (let value of eachArr(value, nPath, cPath, lIndex)) {
                            yield value;
                        }
                    } else {
                        throw new Error(`${ curPath } must be an array`);
                    }
                } else if (nextPath.includes('.') || !isEmpty(nextPath)) { // value must be an object
                    if (isObject(value)) {
                        nextPath = nextPath.startsWith('.') ? nextPath.substr(1) : nextPath;

                        if (nextPath.includes('*')) {
                            for (let value of eachObj(value, ePath, lastIndex)) {
                                yield value;
                            }
                        } else {
                            yield getObjectPathValue(value, nextPath);
                        }
                    } else {
                        throw new Error(`${ curPath } must be an object`);
                    }
                } else { // no next path. Use current value directly
                    yield value;
                }
            }
        };

        for (let value of eachArr(arr, remPath, `${ arrPath }.*`, index)) {
            yield value;
        }
    };

    for (let value of eachObj(clone(obj), path)) {
        yield value;
    }
};

export const getObjectPathValue = (obj, path) => {
    const paths = path.split('.');
    let value = clone(obj);
    let valuePath = '';

    while (paths.length) {
        const nextPath = paths.shift();

        if (typeof value !== 'object' || value === null) {
            throw new Error(`${ valuePath } is not an object or array`);
        }

        if (valuePath) {
            valuePath += '.';
        }

        valuePath += nextPath;

        value = value[nextPath];
    }

    return value;
};

export const isEmpty = val => {
    const arrayIsEmpty = Array.isArray(val) && !val.length;
    const objectIsEmpty = isObject(val) && !Object.keys(val).length;

    return arrayIsEmpty || objectIsEmpty || val === undefined || val === null || val === '';
};

export const isObject = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

export const parseMessage = (message, replacements = {}) => {
    for (let param in replacements) {
        message = message.replace(param, replacements[param]);
    }

    return message;
};

export const regexFromString = (str) => {
    if (!str.startsWith('/')) {
        return new RegExp(str);
    }

    const strArr = str.split('');

    strArr.splice(str.lastIndexOf('/'));
    strArr.splice(str.indexOf('/'), 1);

    const newStr = strArr.join('');
    const flags = str.substr(str.lastIndexOf('/') + 1);

    return new RegExp(newStr, flags);
};

export const toStudly = (str) => str.replace(/^[A-Z]+/, chr => chr.toLowerCase()).replace(/(_|-)+[a-z]/gi, chr => chr[1].toUpperCase());