export declare const ComponentFlag = "ui-";
export declare const EventFlag = "on";
/**
 * 将自定义符号分隔的字符串，转换为小驼峰
 * @param {*} text
 * @returns {string}
 */
export declare const textToUpperCase: (text: any) => string;
/**
 * 获取 Custom elements 上所有属性的键值对
 * @param {HTMLElement} elem
 * @returns
 */
export declare const getCustomAttributes: (elem: Element) => {
    props: {
        [propName: string]: string;
    };
    events: {
        [propName: string]: string;
    };
};
