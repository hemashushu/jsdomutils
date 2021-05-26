const domino = require('domino');

const { IllegalArgumentException } = require('jsexception');
const { StringUtils } = require('jsstringutils');

const ComputeSize = require('./computesize');

class DomUtils {

    static containsClassName(classList, className) {
        return classList.contains(className);
    }

    static containsAllClassNames(classList, classNames) {
        let clazzs = Array.from(classList);
        return classNames.every((item) => {
            return clazzs.includes(item);
        });
    }

    /**
     * 根据指定的样式名或者标签名，从当前元素开始寻找符合的元素，找不到
     * 则往父节点寻找，直到到达指定的 topElement 元素或者 BODY 元素为止。
     *
     * - className 和 tagName 都是可选的，但不能同时为 undefined
     * - topElement 也是可选的，默认情况下搜索到 BODY 元素即停止
     * - 结果有可能是起始节点，如果它的条件匹配的话。
     *
     * @param {*} node
     * @param {*} className
     * @param {*} tagName
     * @param {*} topElement
     * @returns 如果找不到符合的元素则返回 undefined
     */
    static findElementAndParent(node, className, tagName, topElement) {

        // the 'Node' object:
        // https://developer.mozilla.org/en-US/docs/Web/API/Node
        //
        // 有一种节点称为 Text Node （文本节点），它是元素（Element）之间的文本：
        // Node.nodeType: TEXT_NODE =3
        // Node.nodeName: a Text node will have the '#text' string.

        let element = node;
        while (element !== null && element !== topElement && element.tagName !== 'BODY') {

            if (element.nodeType === Node.ELEMENT_NODE) {
                if (className !== undefined && tagName !== undefined) {
                    if (DomUtils.containsClassName(element.classList, className) &&
                        element.tagName === tagName) {
                        return element;
                    }
                } else if (className !== undefined) {
                    if (DomUtils.containsClassName(element.classList, className)) {
                        return element;
                    }
                } else if (tagName !== undefined) {
                    if (element.tagName === tagName) {
                        return element;
                    }
                }
            }

            element = element.parentNode;
        }

        // 找不到符合的元素，返回 undefined
    }

    /**
     * 根据指定的样式名或者标签名，从当前元素的父节点开始寻找所有符合的
     * 父节点，直到到达指定的 topElement 元素或者 BODY 元素为止。
     *
     * - className 和 tagName 都是可选的，但不能同时为 undefined
     * - topElement 也是可选的，默认情况下搜索到 BODY 元素即停止
     * - 结果不会是起始节点，即使它的条件匹配。
     *
     * @param {*} node
     * @param {*} className
     * @param {*} tagName
     * @param {*} topElement
     * @returns 如果找不到符合的元素则返回 undefined
     */
    static findParentElement(node, className, tagName, topElement) {
        let element = node;
        while (element !== null && element !== topElement && element.tagName !== 'BODY') {
            element = element.parentNode;

            if (element.nodeType === Node.ELEMENT_NODE) {
                if (className !== undefined && tagName !== undefined) {
                    if (DomUtils.containsClassName(element.classList, className) &&
                        element.tagName === tagName) {
                        return element;
                    }
                } else if (className !== undefined) {
                    if (DomUtils.containsClassName(element.classList, className)) {
                        return element;
                    }
                } else if (tagName !== undefined) {
                    if (element.tagName === tagName) {
                        return element;
                    }
                }
            }
        }

        // 找不到符合的元素，返回 undefined
    }

    /**
     * 根据指定的样式名或者标签名，从当前元素的同层的排在之前的
     * 姐妹节点（previous sibling nodes）开始寻找符合的元素，若找不到则
     * 转到父节点，以及父节点的排在之前的姐妹节点，直到到达指定的 topElement 元素
     * 或者 BODY 元素为止。
     *
     * - className 和 tagName 都是可选的，但不能同时为 undefined
     * - topElement 也是可选的，默认情况下搜索到 BODY 元素即停止
     * - 结果不会是起始节点，即使它的条件匹配。
     *
     * @param {*} node
     * @param {*} className
     * @param {*} topElement
     * @returns 如果找不到符合的元素则返回 undefined
     */
    static findPreviousElementAndParent(node, className, tagName, topElement) {
        let element = node;
        while (element !== null && element !== topElement && element.tagName !== 'BODY') {

            // see also:
            // https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling
            let previousElement = element.previousSibling;
            if (previousElement === null) {
                // reach the first child, go up parent node
                element = element.parentNode;
            } else {
                element = previousElement;
            }

            if (element.nodeType === Node.ELEMENT_NODE) {
                if (className !== undefined && tagName !== undefined) {
                    if (DomUtils.containsClassName(element.classList, className) &&
                        element.tagName === tagName) {
                        return element;
                    }

                } else if (className !== undefined) {
                    if (DomUtils.containsClassName(element.classList, className)) {
                        return element;
                    }

                } else if (tagName !== undefined) {
                    if (element.tagName === tagName) {
                        return element;
                    }
                }
            }
        }

        // 找不到符合的元素，返回 undefined
    }

    /**
     * 根据指定的一组样式名，从当前元素的同层的排在之前的
     * 姐妹节点（previous sibling nodes）开始寻找符合的元素，若找不到则
     * 转到父节点，以及父节点的排在之前的姐妹节点，直到到达指定的 topElement 元素
     * 或者 BODY 元素为止。
     *
     * - topElement 是可选的，默认情况下搜索到 BODY 元素即停止
     * - 结果不会是起始节点，即使它的条件匹配。
     *
     * @param {*} node
     * @param {*} classNames 样式名称数组
     * @param {*} topElement
     * @returns 如果找不到符合的元素则返回 undefined
     */
    static findPreviousElementAndParentByClassNames(node, classNames, topElement) {

        let element = node;
        while (element !== null && element !== topElement && element.tagName !== 'BODY') {

            // see also:
            // https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling
            let previousElement = element.previousSibling;
            if (previousElement === null) {
                // reach the first child, go up parent node
                element = element.parentNode;
            } else {
                element = previousElement;
            }

            if (element.nodeType === Node.ELEMENT_NODE) {
                if (DomUtils.containsAllClassNames(element.classList, classNames)) {
                    return element;
                }
            }
        }

        // 找不到符合的元素，返回 undefined
    }

    /**
     * 将 HTML 文本转为 Dom 对象，使用浏览器原生（native）的
     * DOMParser 对象来解析。
     *
     * @param {*} html
     * @returns 返回 document.body Element，如果 html 文本的顶层只有一个 Element，
     *     则可以通过 bodyElement.firstChild 获得此 Element 对象。比如：
     *     html = '<div class="test"></div>'
     *     则可以通过 parseHTML(html).firstChild 获取 '.test' Element。
     */
    static parseHTML(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        return doc.body;
    }

    /**
     * 将 HTML 文本转为 Dom 对象，使用后端的 DOM 解析器。
     *
     * 跟 DomUtils.parseHTML() 不同，这个方法适用于后端环境（比如 nodejs）
     *
     * @param {*} html
     * @returns 返回 document.body Element，如果 html 文本的顶层只有一个 Element，
     *     则可以通过 bodyElement.firstChild 获得此 Element 对象。比如：
     *     html = '<div class="test"></div>'
     *     则可以通过 parseHTML(html).firstChild 获取 '.test' Element。
     */
    static parseHTMLbackend(html) {
        // 当程序不在浏览器环境中运行时，使用 domino 库来解析和构造
        // document 对象：
        let doc = domino.createDocument(html, true)
        return doc.body;
    }

    /**
     * 通过元素的样式列表（classList ）来记录一个 boolean 类型的数据
     *
     * @param {*} element
     * @param {*} name
     * @param {*} booleanValue
     */
    static setBooleanByClass(element, name, booleanValue) {
        if (booleanValue === true) {
            element.classList.add(name);
        } else {
            element.classList.remove(name);
        }
    }

    static getBooleanByClass(element, name) {
        return (element.classList.contains(name));
    }

    /**
     * 通过元素的样式列表（classList ）来记录一个枚举类型的数据
     *
     * @param {*} element
     * @param {*} options 值列表（数组）
     * @param {*} optionValue 值
     */
    static setOptionByClass(element, options, optionValue) {
        if (!options.includes(optionValue)) {
            throw new IllegalArgumentException(
                `The value "${optionValue}" is not one value of [${options.join(',')}].`);
        }

        for (let option of options) {
            if (optionValue === option) {
                element.classList.add(option);
            } else {
                element.classList.remove(option);
            }
        }
    }

    /**
     * 通过元素的样式列表（classList ）来读取一个枚举类型的数据的值
     *
     * @param {*} element
     * @param {*} options 值列表
     * @returns 如果没有找到值列表之中的任何一个值，则返回 undefined
     */
    static getOptionByClass(element, options) {
        for (let option of options) {
            if (element.classList.contains(option)) {
                return option;
            }
        }
    }

    /**
     * 将字符串值储存在 element 的 dataset 当中。
     *
     * @param {*} element
     * @param {*} name 属性名，大小写格式必须是 camel case。
     * @param {*} stringValue
     */
    static setStringInDataset(element, name, stringValue) {
        if (!StringUtils.isCamelCase(name)) {
            throw new IllegalArgumentException(
                'The dataset name should be in camel case.')
        }

        element.dataset[name] = stringValue;
    }

    /**
     * 在 element 的 dataset 当中读取指定属性名的字符串值。
     * @param {*} element
     * @param {*} name 属性名，大小写格式必须是 camel case。
     * @returns 如果找不到指定的属性名，则返回 undefined.
     */
    static getStringInDataset(element, name) {
        return element.dataset[name];
    }

    /**
     * 将整型数值储存在 element 的 dataset 当中。
     *
     * @param {*} element
     * @param {*} name 属性名，大小写格式必须是 camel case。
     * @param {*} integerValue
     */
    static setIntegerInDataset(element, name, integerValue) {
        if (!StringUtils.isCamelCase(name)) {
            throw new IllegalArgumentException(
                'The dataset name should be in camel case.')
        }

        element.dataset[name] = integerValue;
    }

    /**
     * 在 element 的 dataset 当中读取指定属性名的整型数值。
     * @param {*} element
     * @param {*} name 属性名，大小写格式必须是 camel case。
     * @returns 如果找不到指定的属性名，则返回 undefined.
     */
    static getIntegerInDataset(element, name) {
        let value = element.dataset[name];

        if (value !== undefined) {
            return parseInt(value, 10);
        }
    }

    /**
     * 将浮点型数值储存在 element 的 dataset 当中。
     *
     * @param {*} element
     * @param {*} name 属性名，大小写格式必须是 camel case。
     * @param {*} floatValue
     */
    static setFloatInDataset(element, name, floatValue) {
        if (!StringUtils.isCamelCase(name)) {
            throw new IllegalArgumentException(
                'The dataset name should be in camel case.')
        }

        element.dataset[name] = floatValue;
    }

    /**
     * 在 element 的 dataset 当中读取指定属性名的浮点型数值。
     * @param {*} element
     * @param {*} name 属性名，大小写格式必须是 camel case。
     * @returns 如果找不到指定的属性名，则返回 undefined.
     */
    static getFloatInDataset(element, name) {
        let value = element.dataset[name];

        if (value !== undefined) {
            return parseFloat(value);
        }
    }

    /**
     * 将 boolean 型数值储存在 element 的 dataset 当中。
     *
     * @param {*} element
     * @param {*} name 属性名，大小写格式必须是 camel case。
     * @param {*} booleanValue
     */
    static setBooleanInDataset(element, name, booleanValue) {
        if (!StringUtils.isCamelCase(name)) {
            throw new IllegalArgumentException(
                'The dataset name should be in camel case.')
        }

        element.dataset[name] = booleanValue;
    }

    /**
     * 在 element 的 dataset 当中读取指定属性名的 boolean 型数值。
     * @param {*} element
     * @param {*} name 属性名，大小写格式必须是 camel case。
     * @returns 如果找不到指定的属性名，则返回 false.
     */
    static getBooleanInDataset(element, name) {
        return element.dataset[name] === 'true';
    }

    /**
     * 设置指定元素样式当中单位为 pixel 的样式值
     *
     * 传递 undefined 或者空字符串给 pixelValue 参数将会删除相应的样式值。
     *
     * @param {*} element
     * @param {*} name
     * @param {*} pixelValue
     */
    static setPixelValueInStyle(element, name, pixelValue) {
        if (pixelValue === undefined || pixelValue === '') {
            element.style[name] = '';
        } else {
            element.style[name] = pixelValue + 'px';
        }
    }

    /**
     * 获取指定元素单位为 pixel 的指定样式的值
     *
     * @param {*} element
     * @param {*} name
     * @returns 如果指定的样式没有设置值，则返回 undefined
     */
    static getPixelValueInStyle(element, name) {

        // 获取直接设置的值，而不是 getComputedStyle() 所得的值。
        let value = element.style[name];

        // 当没有直接设置的值时，value 的值为一个空字符串。

        if (value === '') {
            // 返回 undefined
            return;
        }

        let integer = value.substring(0, value.length - 2);
        return parseInt(integer, 10);
    }

    /**
     * 获得一个元素关于计算大小的对象。
     *
     * @param {*} element
     * @returns 返回 ComputeSize 对象。
     */
    static getComputeSize(element) {
        return new ComputeSize(element);
    }

    /**
     * 获取元素的 outer height
     * outer height = offset height + margin top + margin bottom
     *
     * @param {*} element
     * @returns
     */
    static getOuterHeight(element) {
        let computeSize = DomUtils.getComputeSize(element);
        return element.offsetHeight + computeSize.marginTop + computeSize.marginBottom;
    }

    /**
     * 获取元素的 outer height
     * @param {*} computeSize
     * @returns
     */
    static getOuterHeightByComputeSize(computeSize) {
        return computeSize.element.offsetHeight + computeSize.marginTop + computeSize.marginBottom;
    }

    /**
     * 获取元素的 outer width
     * outer width = offset width + margin left + margin right
     *
     * @param {*} element
     * @returns
     */
    static getOuterWidth(element) {
        let computeSize = DomUtils.getComputeSize(element);
        return element.offsetWidth + computeSize.marginLeft + computeSize.marginRight;
    }

    /**
     * 获取元素的 outer width
     * @param {*} computeSize
     * @returns
     */
    static getOuterWidthByComputeSize(computeSize) {
        return computeSize.element.offsetWidth + computeSize.marginLeft + computeSize.marginRight;
    }
}

module.exports = DomUtils;