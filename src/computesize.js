const { IllegalArgumentException } = require('jsexception');
const { StringUtils } = require('jsstringutils');

/**
 * 获取计算样式（compute style）的值。
 *
 * ## 关于 HTML element size
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/height
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
 *
 * /-----------------\  <----------------
 * |                 |  <- border       |
 * |-=-=-=-=-=-=-=-=-|  <------------   |<-- offsetHeight
 * |                 |  <- padding  |   |    include border and scrollbar
 * |=================|  <--         |   |
 * |                 |    |         |<------ clientHeight
 * |     content     |  css height  |   |    include padding
 * |                 |    |         |   |
 * |                 |    |         |   |
 * |=================|  <--         |   |
 * |     padding     |              |   |
 * |-=-=-=-=-=-=-=-=-|  <------------   |
 * |     border      |                  |
 * \-----------------/  <----------------
 *
 * scroll height = content height + padding
 *
 * 另外参考:
 *
 * - https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
 * - https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * - https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
 *
 * 对象的方法有：
 * - add(s)
 * - remove(s)
 * - contains(s)
 * - item(x)
 * - length
 */
class ComputeSize {

    constructor(element) {

        this.element = element;

        // 参考：
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
        // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
        // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements

        this.computeStyle = window.getComputedStyle(element);
    }

    /**
     * 获取指定计算样式的值
     *
     * @param {*} name 样式名称，注意要使用减号分隔格式的名称，不要使用
     *     驼峰或者其他格式，比如要使用 'margin-left'，而不应使用 'marginLeft'
     * @returns
     */
    getValue(name) {
        if (!StringUtils.isDashCase(name)) {
            throw new IllegalArgumentException('Style name should be dash-case.');
        }

        return this.computeStyle.getPropertyValue(name);
    }

    /**
     * 设置指定样式的值
     *
     * @param {*} name 样式名称，注意要使用减号分隔格式的名称，不要使用
     *     驼峰或者其他格式，比如要使用 'margin-left'，而不应使用 'marginLeft'
     * @param {*} value 样式的值，传递空字符串或者 undefined 可以
     *     清除指定的样式。注意需要带单位，比如 'px', 'em'。
     */
    setValue(name, value) {
        if (!StringUtils.isDashCase(name)) {
            throw new IllegalArgumentException('Style name should be dash-case.');
        }

        if (value === undefined) {
            value = '';
        }

        this.element.style[name] = value;
    }

    getPixelValue(name) {
        let pixel = this.getValue(name);
        return parseInt(pixel.substring(0, pixel.length - 2), 10);
    }

    setPixelValue(name, value) {
        if (value === undefined || value === '') {
            this.setValue(name, '');
        } else {
            let pixel = value + 'px';
            this.setValue(name, pixel);
        }
    }

    get left() {
        return this.getPixelValue('left');
    }

    set left(value) {
        this.setPixelValue('left', value);
    }

    get top() {
        return this.getPixelValue('top');
    }

    set top(value) {
        this.setPixelValue('top', value);
    }

    get right() {
        return this.getPixelValue('right');
    }

    set right(value) {
        this.setPixelValue('right', value);
    }

    get bottom() {
        return this.getPixelValue('bottom');
    }

    set bottom(value) {
        this.setPixelValue('bottom', value);
    }

    get marginLeft() {
        return this.getPixelValue('margin-left');
    }

    set marginLeft(value) {
        this.setPixelValue('margin-left', value);
    }

    get marginTop() {
        return this.getPixelValue('margin-top');
    }

    set marginTop(value) {
        this.setPixelValue('margin-top', value);
    }

    get marginRight() {
        return this.getPixelValue('margin-right');
    }

    set marginRight(value) {
        this.setPixelValue('margin-right', value);
    }

    get marginBottom() {
        return this.getPixelValue('margin-bottom');
    }

    set marginBottom(value) {
        this.setPixelValue('margin-bottom', value);
    }

    get paddingLeft() {
        return this.getPixelValue('padding-left');
    }

    set paddingLeft(value) {
        this.setPixelValue('padding-left', value);
    }

    get paddingTop() {
        return this.getPixelValue('padding-top');
    }

    set paddingTop(value) {
        this.setPixelValue('padding-top', value);
    }

    get paddingRight() {
        return this.getPixelValue('padding-right');
    }

    set paddingRight(value) {
        this.setPixelValue('padding-right', value);
    }

    get paddingBottom() {
        return this.getPixelValue('padding-bottom');
    }

    set paddingBottom(value) {
        this.setPixelValue('padding-bottom', value);
    }

    get height() {
        return this.getPixelValue('height');
    }

    set height(value) {
        this.setPixelValue('height', value);
    }

    get width() {
        return this.getPixelValue('width');
    }

    set width(value) {
        this.setPixelValue('width', value);
    }
}

module.exports = ComputeSize;