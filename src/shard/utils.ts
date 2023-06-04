// export const ComponentFlag = /^\[[a-zA-Z]+\]$/;  // 组件库元素标签属性的 Flag 
// export const EventFlag = /^\([a-zA-Z]+\)$/;  // 组件库元素方法属性的 Flag 
export const ComponentFlag = 'ui-';  // 组件库元素标签属性的 Flag 
export const EventFlag = 'on';  // 组件库元素方法属性的 Flag 

/**
 * 将自定义符号分隔的字符串，转换为小驼峰 
 * @param {*} text 
 * @returns {string}
 */
export const textToUpperCase = (text: any): string => {
  if(!text) return '';
  return text.replace(/-(\w)/g, (_all: any, letter: string) => letter.toUpperCase());
}

/**
 * 获取 Custom elements 上所有属性的键值对
 * @param {HTMLElement} elem 
 * @returns 
 */
export const getCustomAttributes = (elem: Element) => {
  const props: { [propName: string]: string } = {};
  const events: { [propName: string]: string } = {};

  if (elem) {
    const attrSource = Object.values(elem.attributes);
  
    attrSource &&
    attrSource.length > 0 &&
    attrSource.forEach(ele => {
        const { name, value } = ele;
        if (name.startsWith(ComponentFlag)) { // 自定义属性
          const _name = name.replace(ComponentFlag, ''); // 去掉[]
          props[_name] = value;
        }
        if (name.startsWith(EventFlag)) { // 自定义事件
          events[name] = value;
        }
    })
  }

  return {
    props,
    events,
  };
}
