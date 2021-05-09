// POUR CSS OBJETS AFPANIER
var oReType = {}
var asRgbComponent = ['red', 'green', 'blue'];
oReType.array       = /\[(?<content>([\S\s]*))\]/i; // content *
oReType.hexa        = /^#?(?<hex>[0-9a-f]{6})(?:,(?<alpha>0?\.\d{1,3}|0|1))?$/i; // #hex,alpha (alpha in option)
oReType.rgb         = /^rgb\((?<red>\d{1,3}),(?<green>\d{1,3}),(?<blue>\d{1,3})\)$/i; // 
oReType.rgba        = /^rgba\((?<red>\d{1,3}),(?<green>\d{1,3}),(?<blue>\d{1,3}),(?<alpha>(0?(\.\d{1,3})?)|1)\)$/i; // check after if values >= 0 && <= 255
oReType.Colorname   = /^(?<Colorname>\w+\w)(?:,(?<alpha>0?\.\d{1,3}|0|1))?$/i; // Colorname,alpha (alpha in option)
var sColor;
var sHexColor;
var sRGBColor;
var sRGBAColor;
var aRGBAColor = {};
var sRGBAColorTrans40;
var sRGBAColorTrans90;
// return the value of a CSS variable from his name
function getCssVar(variable, element = document.documentElement, withoutQuotes = true) {
    if (variable.substr(0, 2) !== '--')  { variable = '--' + variable }
    var cssVar = getComputedStyle(element, null).getPropertyValue(variable);
    if (typeof(cssVar) == 'string') {
        cssVar = cssVar.trim();
        if (withoutQuotes) {
            bIsString = (cssVar.substr(0, 1) === "'" && cssVar.substr(cssVar.length - 1, 1) === "'");
            if (bIsString) {
                return cssVar.substring(1, cssVar.length - 1);
            } else {
                return cssVar;
            }
        } else {
            return cssVar;
        }
    } else {
    return cssVar;
    }    
}
// define the value a CSS variable from his name
function setCssVar(variable, value, element = document.documentElement) {
    if (variable.substr(0, 2) !== '--')  { variable = '--' + variable }
    element.style.setProperty(variable, value);
}
class Color {
    aFormatToConstruct;
    oGetColorFormatResults;
    oColorname = {
        black: "#000000", 
        silver: "#c0c0c0", 
        gray: "#808080", 
        white: "#ffffff", 
        maroon: "#800000", 
        red: "#ff0000", 
        purple: "#800080", 
        fuchsia: "#ff00ff", 
        green: "#008000", 
        lime: "#00ff00", 
        olive: "#808000", 
        yellow: "#ffff00", 
        navy: "#000080", 
        blue: "#0000ff", 
        teal: "#008080", 
        aqua: "#00ffff", 
        orange: "#ffa500", 
        aliceblue: "#f0f8ff", 
        antiquewhite: "#faebd7", 
        aquamarine: "#7fffd4", 
        azure: "#f0ffff", 
        beige: "#f5f5dc", 
        bisque: "#ffe4c4", 
        blanchedalmond: "#ffebcd", 
        blueviolet: "#8a2be2", 
        brown: "#a52a2a", 
        burlywood: "#deb887", 
        cadetblue: "#5f9ea0", 
        chartreuse: "#7fff00", 
        chocolate: "#d2691e", 
        coral: "#ff7f50", 
        cornflowerblue: "#6495ed", 
        cornsilk: "#fff8dc", 
        crimson: "#dc143c", 
        cyan: "#00ffff", 
        darkblue: "#00008b", 
        darkcyan: "#008b8b", 
        darkgoldenrod: "#b8860b", 
        darkgray: "#a9a9a9", 
        darkgreen: "#006400", 
        darkgrey: "#a9a9a9", 
        darkkhaki: "#bdb76b", 
        darkmagenta: "#8b008b", 
        darkolivegreen: "#556b2f", 
        darkorange: "#ff8c00", 
        darkorchid: "#9932cc", 
        darkred: "#8b0000", 
        darksalmon: "#e9967a", 
        darkseagreen: "#8fbc8f", 
        darkslateblue: "#483d8b", 
        darkslategray: "#2f4f4f", 
        darkslategrey: "#2f4f4f", 
        darkturquoise: "#00ced1", 
        darkviolet: "#9400d3", 
        deeppink: "#ff1493", 
        deepskyblue: "#00bfff", 
        dimgray: "#696969", 
        dimgrey: "#696969", 
        dodgerblue: "#1e90ff", 
        firebrick: "#b22222", 
        floralwhite: "#fffaf0", 
        forestgreen: "#228b22", 
        gainsboro: "#dcdcdc", 
        ghostwhite: "#f8f8ff", 
        gold: "#ffd700", 
        goldenrod: "#daa520", 
        greenyellow: "#adff2f", 
        grey: "#808080", 
        honeydew: "#f0fff0", 
        hotpink: "#ff69b4", 
        indianred: "#cd5c5c", 
        indigo: "#4b0082", 
        ivory: "#fffff0", 
        khaki: "#f0e68c", 
        lavender: "#e6e6fa", 
        lavenderblush: "#fff0f5", 
        lawngreen: "#7cfc00", 
        lemonchiffon: "#fffacd", 
        lightblue: "#add8e6", 
        lightcoral: "#f08080", 
        lightcyan: "#e0ffff", 
        lightgoldenrodyellow: "#fafad2", 
        lightgray: "#d3d3d3", 
        lightgreen: "#90ee90", 
        lightgrey: "#d3d3d3", 
        lightpink: "#ffb6c1", 
        lightsalmon: "#ffa07a", 
        lightseagreen: "#20b2aa", 
        lightskyblue: "#87cefa", 
        lightslategray: "#778899", 
        lightslategrey: "#778899", 
        lightsteelblue: "#b0c4de", 
        lightyellow: "#ffffe0", 
        limegreen: "#32cd32", 
        linen: "#faf0e6", 
        magenta: "#ff00ff", 
        mediumaquamarine: "#66cdaa", 
        mediumblue: "#0000cd", 
        mediumorchid: "#ba55d3", 
        mediumpurple: "#9370db", 
        mediumseagreen: "#3cb371", 
        mediumslateblue: "#7b68ee", 
        mediumspringgreen: "#00fa9a", 
        mediumturquoise: "#48d1cc", 
        mediumvioletred: "#c71585", 
        midnightblue: "#191970", 
        mintcream: "#f5fffa", 
        mistyrose: "#ffe4e1", 
        moccasin: "#ffe4b5", 
        navajowhite: "#ffdead", 
        oldlace: "#fdf5e6", 
        olivedrab: "#6b8e23", 
        orangered: "#ff4500", 
        orchid: "#da70d6", 
        palegoldenrod: "#eee8aa", 
        palegreen: "#98fb98", 
        paleturquoise: "#afeeee", 
        palevioletred: "#db7093", 
        papayawhip: "#ffefd5", 
        peachpuff: "#ffdab9", 
        peru: "#cd853f", 
        pink: "#ffc0cb", 
        plum: "#dda0dd", 
        powderblue: "#b0e0e6", 
        rosybrown: "#bc8f8f", 
        royalblue: "#4169e1", 
        saddlebrown: "#8b4513", 
        salmon: "#fa8072", 
        sandybrown: "#f4a460", 
        seagreen: "#2e8b57", 
        seashell: "#fff5ee", 
        sienna: "#a0522d", 
        skyblue: "#87ceeb", 
        slateblue: "#6a5acd", 
        slategray: "#708090", 
        slategrey: "#708090", 
        snow: "#fffafa", 
        springgreen: "#00ff7f", 
        steelblue: "#4682b4", 
        tan: "#d2b48c", 
        thistle: "#d8bfd8", 
        tomato: "#ff6347", 
        turquoise: "#40e0d0", 
        violet: "#ee82ee", 
        wheat: "#f5deb3", 
        whitesmoke: "#f5f5f5", 
        yellowgreen: "#9acd32", 
        rebeccapurple: "#663399"
    }
	constructor(color, alpha = 1) {
        if (color === 'extendsClassConstructorInit')  { return; }
        if (this.aFormatToConstruct === undefined)  { this.aFormatToConstruct = ['hex', 'hexa', 'rgb', 'rgba', 'Colorname', 'Colornamea']; }
        return this.constructObjColorFormat(arguments[0]);
    }
    constructObjColorFormat(color, alpha = 1) {
		var f = 'constructObjColorFormat';
        if (!this.aFormatToConstruct.length)  { this.displayError('no_format_in_aFormatToConstruct'); return false; }
        var sColorFormat;
        var sFormatToConstruct;
        var oTemp;
        if (color === undefined || color === null)  { return false; }
        sColorFormat = this.getColorFormat(arguments[0]); // ask the color format before creating object
        for (let i = 0; i < this.aFormatToConstruct.length; i++) {
            sFormatToConstruct = this.aFormatToConstruct[i];
            if (sFormatToConstruct !== sColorFormat)  { continue; }
            clogd(f, 'sFormatToConstruct', sFormatToConstruct);
            clogd(f, 'sColorFormat', sColorFormat );
             // rgb / rgba
            if (sFormatToConstruct === 'rgb' || sFormatToConstruct === 'rgba') {
               if (typeof(color) === 'string') {
                   this.red = parseInt(this.oGetColorFormatResults.groups.red)
                   this.green = parseInt(this.oGetColorFormatResults.groups.green)
                   this.blue = parseInt(this.oGetColorFormatResults.groups.blue)
                   if (sFormatToConstruct === 'rgba')  {
                       this.colorFrom = 'rgba';
                       this.alpha = parseFloat(this.oGetColorFormatResults.groups.alpha);
                   } else {
                       this.colorFrom = 'rgb';
                   }
               } else if (typeof(color) === 'object') {
                   this.red = color[Object.keys(color)[0]];
                   this.green = color[Object.keys(color)[1]];
                   this.blue = color[Object.keys(color)[2]];
                   if (sFormatToConstruct === 'rgba')  {
                       this.colorFrom = 'rgba';
                       this.alpha = color[Object.keys(color)[3]];
                   } else {
                       this.colorFrom = 'rgb';
                   }
               }
               this.createColorValuesFrom('rgb')
             // hex / hexa
            } else if (sFormatToConstruct === 'hex' || sFormatToConstruct === 'hexa') {
               if (typeof(color) === 'string') {
                   this.hexStr = `#${this.oGetColorFormatResults.groups.hex}`;
                   if (sFormatToConstruct === 'hexa')  {
                       this.colorFrom = 'hexa';
                       this.alpha = parseFloat(this.oGetColorFormatResults.groups.alpha)
                   } else {
                       this.colorFrom = 'hex';
                   }
               } else if (typeof(color) === 'object') {
                   this.hexStr = `#${color[Object.keys(color)[0]]}`;
                   if (sFormatToConstruct === 'hexa')  {
                       this.colorFrom = 'hexa';
                       this.alpha = color[Object.keys(color)[1]];
                   } else {
                       this.colorFrom = 'hex';
                   }
               }
               this.createColorValuesFrom('hexStr')
             // Colorname / Colornamea
            } else if (sFormatToConstruct === 'Colorname' || sFormatToConstruct === 'Colornamea') {
                if (typeof(color) === 'string') {
                    this.ColornameStr = this.oGetColorFormatResults.groups.Colorname;
                    console.log('this.oGetColorFormatResults.groups', this.oGetColorFormatResults.groups)
                    if (sFormatToConstruct === 'Colornamea')  {
                        this.colorFrom = 'Colornamea';
                        this.alpha = parseFloat(this.oGetColorFormatResults.groups.alpha)
                        console.log('this.alpha', this.alpha)
                    } else {
                        this.colorFrom = 'Colorname';
                    }
                } else if (typeof(color) === 'object') {
                    this.ColornameStr = color[Object.keys(color)[0]];
                    if (sFormatToConstruct === 'Colornamea')  {
                        this.colorFrom = 'Colornamea';
                        this.alpha = color[Object.keys(color)[1]];
                    } else {
                        this.colorFrom = 'Colorname';
                    }
                }
                this.createColorValuesFrom('Colorname')
            }
            clogd(f, 'objet Color', this)
            return true;
        }
    }
    createColorValuesFrom(sColorFormatFrom = 'hexStr') {
        var alphaValue;
        switch (sColorFormatFrom) {
            case 'rgb':
                // hexStr, ColornameStr
                this.hexStr = ('#' +
                    (this.red | 1 << 8).toString(16).slice(1) +
                    (this.green | 1 << 8).toString(16).slice(1) +
                    (this.blue | 1 << 8).toString(16).slice(1)).toUpperCase();
                this.getColornameFromHexStr(this.hexStr);
                break;
            case 'hexStr':
                if (this.hexStr !== undefined) {
                    // rgb, ColornameStr
                    let iBigInt = parseInt(this.hexStr.substring(1), 16);
                    this.red = (iBigInt >> 16) & 255;
                    this.green = (iBigInt >> 8) & 255;
                    this.blue = iBigInt & 255;
                    this.getColornameFromHexStr(this.hexStr);
                }
                break;
            case 'Colorname':
                // hexStr, rgb
                this.hexStr = this.oColorname[this.ColornameStr];
                let iBigInt = parseInt(this.hexStr.substring(1), 16);
                this.red = (iBigInt >> 16) & 255;
                this.green = (iBigInt >> 8) & 255;
                this.blue = iBigInt & 255;
                break;
        }
        if (this.alpha === undefined)  { this.alpha = 1 };
        this.rgb = { red: this.red, green:this.green, blue: this.blue };
        this.rgba = { red: this.red, green:this.green, blue: this.blue, alpha: this.alpha };
        this.hex = { hex: this.hexStr };
        this.hexa = { hex: this.hexStr, alpha: this.alpha };
        this.Colorname = { Colorname: this.ColornameStr };
        this.Colornamea = { Colorname: this.ColornameStr, alpha: this.alpha };
        this.rgbStr = `rgb(${this.red},${this.green},${this.blue})`;
        this.rgbaStr = `rgba(${this.red},${this.green},${this.blue},${this.alpha})`;
        this.hexaStr = `${this.hexStr},${this.alpha}`;
        this.ColornameaStr = `${this.ColornameStr},${this.alpha}`;
    }
    getColornameFromHexStr(sHex = this.hexStr) {
        if (sHex.substr(0, 1) !== '#')  { sHex = '#' + sHex; }
        var sHexColor;
        var oThis = this;
        Object.keys(this.oColorname).forEach(function(sColorname) {
            sHexColor = oThis.oColorname[sColorname];
            if (sHex === sHexColor)  { oThis.ColornameStr = sColorname; }
        })
    }
    displayError(typeOfError, detail1 = '', detail2 = '', detail3 = '') {
        var sMsg = 'err: ';
        switch (typeOfError) {
            case 'bad_format_color_on_construct':
                sMsg += `format de couleur non reconnu lors de la création de l'objet '${detail1}'.`;
                if (detail1 !== 'Color')  { sMsg += ` Celui-ci n'accepte que les couleurs au format '${detail2}'. Pour une couleur au format quelconque, utiliser un objet 'Color'`; }
                break;
            case 'alpha':
                sMsg += `la valeur de transparence 'alpha' doit être un nombre compris entre 0 et 1 (utiliser le point et non la virgule si nombre décimal)`;
                break;
            case 'rgb_component':
                sMsg += `la valeur de composante rgb '${detail1}' doit être un nombre entier compris entre 0 et 255`;
                break;
            case 'no_format_in_aFormatToConstruct':
                sMsg += `avant d'appeler constructObjColorFormat(), préciser dans l'array 'this.aFormatToConstruct' le(s) format(s) souhaité(s)`;
        }
        console.log(sMsg)
    }
    isValueValid(val, typeOfVal = 'alpha', typeOfVal_detail) {
        if (val === undefined)  { return false; }
        switch (typeOfVal) {
            case 'hex_color':
                this.oGetColorFormatResults = oReType.hexa.exec(val);
                if (this.oGetColorFormatResults === null ||
                    this.oGetColorFormatResults.groups.hex === undefined) {
                    return false;
                }
                break;
            case 'alpha':
                if (!isNaN(val))  { val = parseFloat(val); }
                if (typeof(val) !== 'number')  { this.displayError('alpha'); return false; }
                if (val < 0 || val > 1)   { this.displayError('alpha'); return false; }
                break;
            case 'rgb_component':
                if (!isNaN(val))  { val = parseFloat(val); }
                if (typeof(val) !== 'number')  { this.displayError('rgb_component', typeOfVal_detail); return false; }
                if (!Number.isInteger(val))  { this.displayError('rgb_component', typeOfVal_detail); return false; }
                if (val < 0 || val > 255)  { this.displayError('rgb_component', typeOfVal_detail); return false; }
                break;
            case 'Colorname':
                if (this.oColorname[val] === undefined)  { return false; }
                break;
        }
        return true;
    }
    getColorFormat(color) {
        var rgbComponent;
        var hexColor;
        var valRgbComponent;
        var alpha;
        var i;
        if (typeof(color) === 'string') {
        // couleur transmise sous forme de texte
            if (color.substr(0, 2) === '--')  { color = getCssVar(color) }  // si nom de variable css fourni, on récupère sa valeur
            color = color.replace(/\s/g, '');
            // hexa / hex ?
            hexColor = color;
            if (color.substr(0, 1) === '#') {
                if (this.isValueValid(hexColor, 'hex_color'))  {
                    return (this.oGetColorFormatResults.groups.alpha !== undefined) ? 'hexa' : 'hex';
                } else {
                    this.displayError('bad_format_color_on_construct', 'Color');
                    return false;
                }
            }
            // rgba ?
            if (color.substr(0, 4) === 'rgba') {
                this.oGetColorFormatResults = oReType.rgba.exec(color);
                if (this.oGetColorFormatResults !== null &&
                    this.oGetColorFormatResults.groups.red !== undefined &&
                    this.oGetColorFormatResults.groups.green !== undefined &&
                    this.oGetColorFormatResults.groups.blue !== undefined) {
                    for (i = 0; i < 3; i++) {
                        rgbComponent = asRgbComponent[i];
                        valRgbComponent = this.oGetColorFormatResults.groups[rgbComponent];
                        if (!this.isValueValid(valRgbComponent, 'rgb_component', rgbComponent))  { return false; }
                    }
                    alpha = this.oGetColorFormatResults.groups.alpha;
                    return (this.isValueValid(alpha, 'alpha')) ? 'rgba' : 'rgb';
                } else {
                    this.displayError('bad_format_color_on_construct', 'Color');
                    return false;
                }
            }
            // rgb ?
            if (color.substr(0, 3) === 'rgb') {
                this.oGetColorFormatResults = oReType.rgb.exec(color);
                if (this.oGetColorFormatResults !== null &&
                    this.oGetColorFormatResults.groups.red !== undefined &&
                    this.oGetColorFormatResults.groups.green !== undefined &&
                    this.oGetColorFormatResults.groups.blue !== undefined) {
                    for (i = 0; i < 3; i++) {
                        rgbComponent = asRgbComponent[i];
                        valRgbComponent = this.oGetColorFormatResults.groups[rgbComponent];
                        if (!this.isValueValid(valRgbComponent, 'rgb_component', rgbComponent))  { return false; }
                    }
                    return 'rgb';
                } else {
                    this.displayError('bad_format_color_on_construct', 'Color');
                    return false;
                }
            }
                // Colorname / Colornamea ?
                this.oGetColorFormatResults = oReType.Colorname.exec(color);
                if (this.oGetColorFormatResults !== null &&
                    this.oGetColorFormatResults.groups.Colorname !== undefined) {
                    if (!this.isValueValid(this.oGetColorFormatResults.groups.Colorname, 'Colorname'))  { return false; }
                        alpha = this.oGetColorFormatResults.groups.alpha;
                        hexColor = this.oColorname[this.oGetColorFormatResults.groups.Colorname];
                        if (hexColor.substr(0, 1) === '#') {
                            this.hexStr = hexColor;
                            return (this.isValueValid(alpha, 'alpha')) ? 'Colornamea' : 'Colorname';
                        }
                    return 'Colorname';
                } else {
                    this.displayError('bad_format_color_on_construct', 'Color');
                    return false;
                }
        } else if (typeof(color) === 'object') {
        // couleur transmise sous forme d'objet'
            // rgb / rgba ?
            if (Object.keys(color).length >= 3) {
                for (let i = 0; i < 3; i++) {
                    rgbComponent = asRgbComponent[i];
                    valRgbComponent = color[Object.keys(color)[i]];
                    if (!this.isValueValid(valRgbComponent, 'rgb_component', rgbComponent))  { return false; }
                }
                alpha = color[Object.keys(color)[3]];
                return (this.isValueValid(alpha, 'alpha')) ? 'rgba' : 'rgb';
            } else if (Object.keys(color).length >= 1) {
                let sColor = color[Object.keys(color)[0]];
                // hex / hexa ?
                if (this.isValueValid(sColor, 'hex_color'))  {
                    if (Object.keys(color).length >=2) {
                        alpha = color[Object.keys(color)[1]];
                        if (this.isValueValid(alpha, 'alpha'))  { return 'hexa'; }
                    } else {
                        return 'hex';
                    }
                // Colorname / Colornamea?
                } else if (this.isValueValid(sColor, 'Colorname'))  {
                    if (Object.keys(color).length >=2) {
                        alpha = color[Object.keys(color)[1]];
                        if (this.isValueValid(alpha, 'alpha')) {
                            return 'Colornamea';
                        } else {
                            this.displayError('alpha');
                            return false;
                        }
                    } else {
                        return 'Colorname';
                    }
                }
            }
        }
        return false;
    }
    // get rgb() {
    //     if (this.red !== undefined && this.green !== undefined && this.blue !== undefined) {
    //         return { red: this.red, green:this.green, blue: this.blue };
    //     } else if (this.hexColor !== undefined) {
    //         var bigint = parseInt(this.hexColor, 16);
    //         var r = (bigint >> 16) & 255;
    //         var g = (bigint >> 8) & 255;
    //         var b = bigint & 255;
    //         return { red: r, green: g, blue: b };
    //     }
    // }
    // get rgbStr() {
	// 	return `rgb(${this.red},${this.green},${this.blue})`;
    // }
    // get rgba() {
    //     return this.rgba_();
    // }
    rgba_(alphaValue = 'auto') {
        if (alphaValue === 'auto')   { alphaValue = this.alpha ?? 1 };
		return { red: this.red, green:this.green, blue: this.blue, alpha: alphaValue };
    }
    // get rgbaStr() {
    //     return this.rgbaStr_();
    // }
    rgbaStr_(alpha = 'auto') {
        if (alpha === 'auto')   { alpha = this.alpha ?? 1 };
		return `rgba(${this.red},${this.green},${this.blue},${alpha})`;
    }
    // get hex() {
    //     if (this.hexColor !== undefined) {
    //         return { hex: this.hexColor };
    //     } else if (this.red !== undefined && this.green !== undefined && this.blue !== undefined) {
    //         return { hex: this.hexStr };
    //     }
    // }
    // get hexa() {
    //     return this.hexa_();
    // }
    hexa_(alphaValue = 'auto') {
        if (alphaValue === 'auto')   { alphaValue = this.alpha ?? 1 };
		return { hex: this.hexStr, alpha: alphaValue };
    }
    // get hexStr() {
    //     let hex = '#' +
    //         (this.red | 1 << 8).toString(16).slice(1) +
    //         (this.green | 1 << 8).toString(16).slice(1) +
    //         (this.blue | 1 << 8).toString(16).slice(1);
    //     return hex.toUpperCase();
    // }
    // get hexaStr() {
    //     return this.hexaStr_();
    // }
    hexaStr_(alphaValue = 'auto') {
        if (alphaValue === 'auto')   { alphaValue = this.alpha ?? 1 };
        return `${this.hexStr},${alphaValue}`;
    }
    ColornameaStr_(alphaValue = 'auto') {
        if (alphaValue === 'auto')   { alphaValue = this.alpha ?? 1 };
        return `${this.ColornameStr},${alphaValue}`;
    } 	
}
// { red: 30,     green: 60,    blue: 90 }      OU      'rgb(30, 60, 90)'
class RgbColor extends Color {
	constructor(color, alpha = 1) {
        let oTemp = new Color;
        let sColorFormat = oTemp.getColorFormat(arguments[0]);
        if (sColorFormat === 'rgb') {
            return super(arguments[0]);
        } else {
            oTemp.displayError('bad_format_color_on_construct', 'RgbColor', 'rgb');
            return false;
        }
    }
}
// { red: 30,     green: 60,    blue: 90,     alpha: 0.25 }      OU      'rgba(30, 60, 90, .25)'
class RgbaColor extends Color {
	constructor(color, alpha = 1) {
        let oTemp = new Color;
        let sColorFormat = oTemp.getColorFormat(arguments[0]);
        console.log(sColorFormat);
        if (sColorFormat === 'rgba') {
            return super(arguments[0]);
        } else {
            oTemp.displayError('bad_format_color_on_construct', 'RgbaColor', 'rgba');
            return false;
        }
    }
}
// { hex: '#7fc241'}        OU      { hex: '7fc241' }       OU      '#7fc241'
class HexColor extends Color {
	constructor(color, alpha = 1) {
        let oTemp = new Color;
        let sColorFormat = oTemp.getColorFormat(arguments[0]);
        if (sColorFormat === 'hex') {
            return super(arguments[0]);
        } else {
            oTemp.displayError('bad_format_color_on_construct', 'HexColor', 'hex');
            return false;
        }
    }
}
// { hex: '#7fc241,.25'}        OU      { hex: '7fc241', alpha: 0.25 }       OU      '#7fc241,.5'
class HexaColor extends Color {
	constructor(color, alpha = 1) {
        let oTemp = new Color;
        let sColorFormat = oTemp.getColorFormat(arguments[0]);
        if (sColorFormat === 'hexa') {
            return super(arguments[0]);
        } else {
            oTemp.displayError('bad_format_color_on_construct', 'HexaColor', 'hexa');
            return false;
        }
    }
}
// { Colorname: 'cyan' }        OU      'cyan'
class Colorname extends Color {
	constructor(color, alpha = 1) {
        let oTemp = new Color;
        let sColorFormat = oTemp.getColorFormat(arguments[0]);
        if (sColorFormat === 'Colorname') {
            return super(arguments[0]);
        } else {
            oTemp.displayError('bad_format_color_on_construct', 'Colorname', 'colorname');
            return false;
        }
    }
}
// { Colorname: 'cyan', alpha: 0.8 }        OU      { Colorname: 'cyan' }       OU      'cyan,.8'
class Colornamea extends Color {
	constructor(color, alpha = 1) {
        let oTemp = new Color;
        let sColorFormat = oTemp.getColorFormat(arguments[0]);
        if (sColorFormat === 'Colornamea') {
            return super(arguments[0]);
        } else {
            oTemp.displayError('bad_format_color_on_construct', 'Colorname', 'colorname');
            return false;
        }
    }
}


function setAfpanierColor(color) {
	cColor = new Color(color);
	sColor100 = cColor.rgbaStr_(1);
	sColor75 = cColor.rgbaStr_(.75);
	sColor50 = cColor.rgbaStr_(.50);
	sColor25 = cColor.rgbaStr_(.25);
	setCssVar("color-default1", sColor100);
	setCssVar("color-default1-opac75", sColor75);
	setCssVar("color-default1-opac50", sColor50);
	setCssVar("color-default1-opac25", sColor25);
}
// // AFPANIER RADIO
$(function() {
	initCss();
	// change la couleur des objets après sélection par l'utilisateur
	$('input[type=color]').on('change', function() {
		setAfpanierColor($(this).val())
	})
})
function initCss() {
    var sColorFromHtmlAttr, cColor, sColor100, sColor75, sColor50, sColor25;
    var sOptionLabel, lOptionWidth, iOptionIndex;
    // Disable style of bootstrap 'custom-control-input' elements
    if (getCssVar('replace-boottrap-custom-classes') === 'true') {
        disableBootstrapCustomControlInputElements();
    }
    function disableBootstrapCustomControlInputElements() {
        $('.custom-control').each(function() {
            if ($(this).hasClass('afpanize') || $(this).parents().hasClass('afpanize')) {
                $(this).removeClass('custom-control');
                $(this).addClass('c-control');
            }
        })
        $('.custom-radio').each(function() {
            if ($(this).hasClass('afpanize') || $(this).parents().hasClass('afpanize')) {
                $(this).removeClass('custom-radio');
                $(this).addClass('c-radio');
            }
        })
        $('.custom-control-input').each(function() {
            if ($(this).hasClass('afpanize') || $(this).parents().hasClass('afpanize')) {
                $(this).removeClass('custom-control-input');
                $(this).addClass('c-control-input');
            }
        })
        $('.custom-control-label').each(function() {
            if ($(this).hasClass('afpanize') || $(this).parents().hasClass('afpanize')) {
                $(this).removeClass('custom-control-label');
                $(this).addClass('c-control-label');
            }
        })
    }

    // Colors : set css colors variables from 'color-if-undefined' css variable
    if (getCssVar('color-from-js') === 'true') {
        setAfpanierColor(getCssVar('color-if-undefined'));
        // Colors : set css colors variables from 'color' html attribute on '.customize' elements
        $('.customize').each(function() {
            sColorFromHtmlAttr = $(this).attr('color');
            if (sColorFromHtmlAttr !== undefined && sColorFromHtmlAttr.trim() !== '') {
                cColor = new Color(sColorFromHtmlAttr);
                sColor100 = cColor.rgbaStr_(1);
                sColor75 = cColor.rgbaStr_(.75);
                sColor50 = cColor.rgbaStr_(.50);
                sColor25 = cColor.rgbaStr_(.25);
                setCssVar("color-default1", sColor100, this);
                setCssVar("color-default1-opac75", sColor75, this);
                setCssVar("color-default1-opac50", sColor50, this);
                setCssVar("color-default1-opac25", sColor25, this);
            }
        })    
    }

    // Selects : to apply CSS style when select change
    $(".afpanize select:not([multiple])").on('change click', applyCssOnSelect);
    applyCssOnSelect(true);

    function applyCssOnSelect(onload = false) {
        var bIsSelected = false;
        bIsMultiple = ($(this).attr('multiple') === 'multiple');
        bHasFirstClass = ($(this).hasClass('first'));
        if (!bIsMultiple)  { $(this).children("option").removeAttr('selected'); }
            $(this).children("option:selected").attr('selected', true);
            //$(this).children("option:selected").toggleAttr('selected', true);  

        if (onload === true) {
            $(".afpanize select:not([multiple])").each(function(){
                $(this).children("option[selected]").each(function() {
                    sOptionLabel = $(this).html();
                    iOptionIndex = $(this).index();
                    if ((iOptionIndex === 0 && !bHasFirstClass) || iOptionIndex >= 1)  { oOptionBefore = `  `; }
                    oOptionBefore += `${sOptionLabel}${' '.repeat(200)}`;
                    lSelectWidth = $(this).parent().width();
                    bIsSelected = ($(this).attr('selected') === 'selected'); // works ?
                    $(this).attr('data-before', oOptionBefore);
                    $(this).parent().width(lSelectWidth);
                    // if (bIsSelected) {
                    //     $(this).prop('selected', false);
                    // }
                })    
            })
        } else {
            $(this).children("option[selected]").each(function() {
                sOptionLabel = $(this).html();
                iOptionIndex = $(this).index();
                if ((iOptionIndex === 0 && !bHasFirstClass) || iOptionIndex >= 1)  { oOptionBefore = `  `; }
                oOptionBefore += `${sOptionLabel}${' '.repeat(200)}`;
                lSelectWidth = $(this).parent().width();
                bIsSelected = ($(this).attr('selected') === 'selected'); // works ?
                $(this).attr('data-before', oOptionBefore);
                $(this).parent().width(lSelectWidth);
                // if (bIsSelected) {
                //     $(this).prop('selected', false);
                // }
            })    
        }
    }

    // Label for checkboxes/radio functions
    function applyCssOnLabelRadioOrCheckboxOnHover() {
        $(".afpanize input[type='radio'] ~ label[for]").on('mouseenter', function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseenter'); });
        $("input[type='radio'].afpanize ~ label[for]").on('mouseenter', function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseenter'); });
        $(".afpanize input[type='checkbox'] ~ label[for]").on('mouseenter', function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseenter'); });
        $("input[type='checkbox'].afpanize ~ label[for]").on('mouseenter', function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseenter'); });
        $(".afpanize input[type='radio'] ~ label[for]").on('mouseleave', function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseleave'); });
        $("input[type='radio'].afpanize ~ label[for]").on('mouseleave', function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseleave'); });
        $(".afpanize input[type='checkbox'] ~ label[for]").on('mouseleave', function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseleave'); });
        $("input[type='checkbox'].afpanize ~ label[for]").on('mouseleave', function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseleave'); });    
    }
    function cssAllLabelRadioOrCheckboxOnUnHover() {
        $(".afpanize input[type='radio'] ~ label[for]").each(function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseleave'); })
        $("input[type='radio'].afpanize ~ label[for]").each(function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseleave'); })
        $(".afpanize input[type='checkbox'] ~ label[for]").each(function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseleave'); })
        $("input[type='checkbox'].afpanize ~ label[for]").each(function() { cssLabelRadioOrCheckboxOnEvent(this, 'mouseleave'); })
    }
    function cssLabelRadioOrCheckboxOnEvent(labelAssociatedWith, event = 'mouseenter') {
        const sCssValInputLabelColorIfEnabledHover      = 'var(--color-input-label-if-enabled-hover, rgb(0, 123, 255))';
        const sCssValInputLabelColorIfEnabledUnhover    = 'var(--color-input-label-if-enabled-unhover, rgb(0, 123, 255))';
        const sCssValInputLabelColorIfDisabled          = 'var(--color-input-label-if-disabled, rgb( 108, 117, 125))';
        const sCssValInputBorderColorIfDisabled         = 'var(--color-border-if-disabled, rgb( 108, 117, 125))';
        var sInputId, $label, $input, bIsInputEnabled;
        sInputId = $(labelAssociatedWith).attr('for');
        $input = $('#' + sInputId);
        bIsInputEnabled = document.getElementById(sInputId).getAttribute('disabled') !== '';
        switch (event) {
            case 'mouseenter':
                if (bIsInputEnabled) {
                    $(labelAssociatedWith).css('color', sCssValInputLabelColorIfEnabledHover);
                    $(labelAssociatedWith).css('cursor', 'pointer');
                } else {
                    $(labelAssociatedWith).css('color', sCssValInputLabelColorIfDisabled);
                    $(labelAssociatedWith).css('border-color', sCssValInputBorderColorIfDisabled);  
                }
                break;
            case 'mouseleave':
                if (bIsInputEnabled) {
                    $(labelAssociatedWith).css('color', sCssValInputLabelColorIfEnabledUnhover);
                } else {
                    $(labelAssociatedWith).css('color', sCssValInputLabelColorIfDisabled);
                    $(labelAssociatedWith).css('border-color', sCssValInputBorderColorIfDisabled);  
                }
        }
    }
    // Label : to apply CSS when hover on associated with radio/checkbox input
    applyCssOnLabelRadioOrCheckboxOnHover();

    // Label : to apply CSS on load on labels associated with radio/checkbox inputs
    cssAllLabelRadioOrCheckboxOnUnHover();

    // Checkboxes : to apply CSS style on indeterminate checkboxes
    let oIndeterminateCheckboxes = document.querySelectorAll("input[type='checkbox'][indeterminate]");
    for (var i = 0; i < oIndeterminateCheckboxes.length; i++) {
        oIndeterminateCheckboxes[i].indeterminate = true;   
    }
    // Input[type='date|text'] : to apply CSS style when value === '' (placeholder...)
    
                // applique classe 'vide' aux inputs_date si vides pour appliquer une couleur équivalente au placeholder
                // $("input[type='date']").on('focus change', (function(e){
                // 	sValeur = $(this).val().trim();
                // 	if (sValeur === '') {
                // 		$(this).addClass('vide');
                // 	} else {
                // 		$(this).removeClass('vide');
                // 	}
                // }));

    initCssInputEmptyOrNot();
    $("input[type='date']").on('change', function() { initCssInputEmptyOrNot(); })
    $("input[type='date']").on('change', function() { initCssInputEmptyOrNot(); })
    $(".afpanize input[type='text']").on('change keypress keyup', function() { initCssInputEmptyOrNot(); })
    $("input[type='text'].afpanize").on('change keypress keyup', function() { initCssInputEmptyOrNot(); })
    $(".afpanize input[type='time']").on('change', function() { initCssInputEmptyOrNot(); })
    $("input[type='time'].afpanize").on('change', function() { initCssInputEmptyOrNot(); })

    function initCssInputEmptyOrNot(element) {
        if (element === undefined) {
            $("input[type='date']").each(function() { initCssInputEmptyOrNot(this); })
            $("input[type='date']").each(function() { initCssInputEmptyOrNot(this); })
            $(".afpanize input[type='text']").each(function() { initCssInputEmptyOrNot(this); })
            $("input[type='text'].afpanize").each(function() { initCssInputEmptyOrNot(this); })
            $(".afpanize input[type='time']").each(function() { initCssInputEmptyOrNot(this); })
            $("input[type='time'].afpanize").each(function() { initCssInputEmptyOrNot(this); })

        } else {
            if (element.value === '') {
                element.classList.add('empty');
            } else {
                element.classList.remove('empty');
            }    
        }
    }

    function toDo() {
        // Selects:not([multiple]) : to avoid apply background-color on children option elements when hover on select element
        $('select:not([multiple]):not([size])').on('hover', function(e){
            // e.stopPropagation();     // dbg
        });
        // Selects : hide first option when 'first' class is set on the select, and put the content in the select when hover
        //     dbg: how to modify the text ?
        $("select.customize:not([multiple]).first option:first-of-type").hide();
        $("select.customize:not([multiple]).first").hover(function() {
            console.log(this);
        })
    }

}
