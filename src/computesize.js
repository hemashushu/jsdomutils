
// see also:
// https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
// https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
// https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
// method:
// add(s), remove(s), contains(s), item(x), length

/*
 * About HTML element size
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
 */

/**
 * Get the compute style values.
 */
class ComputeSize {

	constructor(element) {

        this.element = element;

        // see also:
		// https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
		// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
		// https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements

		this.computeStyle = window.getComputedStyle(element);
	}

    /**
     * Get the compute style value.
     * @param {*} name
     */
	getValue(name) {
        // name:
        // use hyphen style name instead of camel style name, e.g.
        // use 'margin-left' instead of 'marginLeft'
		return this.computeStyle.getPropertyValue(name);
	}

    /**
     * value: pass undefined or '' to clear the specify style value.
     * @param {*} name
     * @param {*} value
     */
	setValue(name, value) {
        // name:
        // use hyphen style name instead of camel style name, e.g.
        // use 'margin-left' instead of 'marginLeft'

        if (value === undefined) {
            value = '';
        }

        // set element style value to empty string ('') to clear the style value.
		this.element.style[name] = value;
	}

    getPixelValue(name) {
        // name:
        // use hyphen style name instead of camel style name, e.g.
        // use 'margin-left' instead of 'marginLeft'

        let pixel = this.getValue(name);
        return parseInt(pixel.substring(0, pixel.length - 2), 10);
    }

    setPixelValue(name, value) {
        // name:
        // use hyphen style name instead of camel style name, e.g.
        // use 'margin-left' instead of 'marginLeft'

        if (value === undefined || value === '') {
            this.setValue(name, '');
        }else {
            let pixel = value + 'px';
            this.setValue(name, pixel);
        }
    }

	// position

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

	// margin

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

	// padding

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

// 	// client height = css height + padding
// 	get clientHeight() {
// 		return this.element.clientHeight;
// 	}
//
// 	get clientWidth() {
// 		return this.element.clientWidth;
// 	}
//
// 	// offset height = client height + border + scrollbar (if present)
// 	get offsetHeight() {
// 		return this.element.offsetHeight;
// 	}
//
// 	get offsetWidth() {
// 		return this.element.offsetWidth;
// 	}

}

// consider to extend html element prototype
// Element.prototype.getStyle = function() {
//     return new StyleUtils(this);
// };

module.exports = ComputeSize;