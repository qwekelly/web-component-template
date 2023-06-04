// export const ComponentFlag = /^\[[a-zA-Z]+\]$/;  // 组件库元素标签属性的 Flag 
// export const EventFlag = /^\([a-zA-Z]+\)$/;  // 组件库元素方法属性的 Flag 
const ComponentFlag = 'ui-'; // 组件库元素标签属性的 Flag 
const EventFlag = 'on'; // 组件库元素方法属性的 Flag 
/**
 * 获取 Custom elements 上所有属性的键值对
 * @param {HTMLElement} elem
 * @returns
 */
const getCustomAttributes = (elem) => {
    const props = {};
    const events = {};
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
            });
    }
    return {
        props,
        events,
    };
};

const colorArr = ['#FFC068', '#94D877', '#5CC2F8', '#77A4F9'];
const Selector$1 = "ui-avatar"; // 组件标签名
class UIAvatar extends HTMLElement {
    static get observedAttributes() { return ['ui-name', 'ui-id']; }
    get 'ui-name'() {
        return this.getAttribute('ui-name');
    }
    set 'ui-name'(value) {
        this.setAttribute('ui-name', value);
    }
    get 'ui-id'() {
        return this.getAttribute('ui-id');
    }
    set 'ui-id'(value) {
        this.setAttribute('ui-id', value.toString());
    }
    constructor() {
        super();
        this.config = {
            name: '匿',
            id: '',
            size: 50,
            radius: 6,
        };
        this.render(); // 统一处理组件初始化逻辑
    }
    render() {
        this.attachShadow({ mode: 'open' });
        this.setAttribute('style', 'display: inline-block;');
    }
    // 生命周期：当 custom element首次被插入文档DOM时，被调用。
    connectedCallback() {
        console.log(this.nodeName, 'connectedCallback');
        this.updateStyle();
    }
    // 当 custom element 从文档DOM中删除时，被调用。
    disconnectedCallback() {
        console.log(this.nodeName, 'disconnected');
    }
    // 当 custom element 增加、删除、修改自身属性时，被调用。
    attributeChangedCallback() {
        console.log(this.nodeName, 'attributeChangedCallback');
        this.updateStyle();
    }
    // 当 custom element 被移动到新的文档时，被调用。
    adoptedCallback() {
        console.log(this.nodeName, 'adoptedCallback');
    }
    updateStyle() {
        const props = getCustomAttributes(this).props;
        this.config = { ...this.config, ...props };
        this.shadowRoot.innerHTML = this.renderTemplate(); // 生成 HTML 模版内容
    }
    renderTemplate() {
        let tail = this.config.id || '0';
        let index = parseInt(tail, 16);
        const letter = this.config.name.substring(0, 1);
        return `
      <style>
        .avatar {
          font-size: ${this.config.size / 2}px;
          color: #ffffff;
          width: ${this.config.size}px;
          height: ${this.config.size}px;
          line-height: ${this.config.size}px;
          text-align: center;
          border-radius: ${this.config.radius}px;
          background-color: ${colorArr[index % colorArr.length] || '#77A4F9'};
        }
      </style>
      <div class="avatar">${letter}</div>
    `;
    }
}
// 定义组件
if (!customElements.get(Selector$1)) {
    customElements.define(Selector$1, UIAvatar);
}

const getTemplate = (config) => `
  <div class="card">
    <div class="card-section">
      <ui-avatar class="card-image" id="uiAvatar" ui-id="${config.id}" ui-name="${config.name}"></ui-avatar>
      <div class="card-info">
        <div class="card-name">${config.name}</div>
        <div class="card-prop">
          <div class="label">职位:</div>
          <div class="value">${config.position}</div>
        </div>
      </div>
    </div>
    <div class="card-desc">${config.desc}</div>
  </div>
`;
const style = `
  .card {
    padding: 12px;
    background-color: #fff;
    border-radius: 6px;
    width: 250px;
  }
  .card-section {
    display: flex;
    align-items: center;
  }
  .card-image {
    flex-shrink: 0;
  }
  .card-info {
    margin-left: 12px;
    flex: 1;
    overflow: hidden;
  }
  .card-name {
    line-height: 22px;
    font-size: 14px;
    color: #333;
  }
  .card-prop {
    margin-top: 4px;
    display: flex;
    align-items: center;
    line-height: 22px;
    font-size: 14px;
    color: #8a919f;
  }
  .card-prop > .value {
    margin-left: 4px;
  }
  .card-desc {
    margin-top: 8px;
    line-height: 18px;
    font-size: 14px;
    color: #333;
  }
`;
const Selector = "ui-card"; // 组件标签名
class UICard extends HTMLElement {
    static get observedAttributes() { return ['ui-name', 'ui-id', 'ui-position', 'ui-desc']; }
    get 'ui-name'() {
        return this.getAttribute('ui-name');
    }
    set 'ui-name'(value) {
        this.setAttribute('ui-name', value);
    }
    get 'ui-id'() {
        return this.getAttribute('ui-id');
    }
    set 'ui-id'(value) {
        this.setAttribute('ui-id', value.toString());
    }
    get 'ui-position'() {
        return this.getAttribute('ui-position');
    }
    set 'ui-position'(value) {
        this.setAttribute('ui-position', value);
    }
    get 'ui-desc'() {
        return this.getAttribute('ui-id');
    }
    set 'ui-desc'(value) {
        this.setAttribute('ui-desc', value);
    }
    constructor() {
        super();
        this.render(); // 统一处理组件初始化逻辑
    }
    render() {
        const root = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const div = document.createElement('div');
        div.setAttribute('id', 'customCard');
        root.appendChild(div);
        root.appendChild(style);
        this.setAttribute('style', 'display: inline-block;');
    }
    // 生命周期：当 custom element 首次被插入文档 DOM 时，被调用。
    connectedCallback() {
        console.log(this.nodeName, 'connectedCallback');
        this.updateConfig();
        this.updateStyle();
    }
    // 当 custom element 从文档 DOM 中删除时，被调用。
    disconnectedCallback() {
        console.log(this.nodeName, 'disconnected');
    }
    // 当 custom element 增加、删除、修改自身属性时，被调用。
    attributeChangedCallback() {
        console.log(this.nodeName, 'attributeChangedCallback');
        this.updateConfig();
    }
    // 当 custom element 被移动到新的文档时，被调用。
    adoptedCallback() {
        console.log(this.nodeName, 'adoptedCallback');
    }
    updateConfig() {
        const props = getCustomAttributes(this).props;
        this.config = { ...this.config, ...props };
        this.shadowRoot.querySelector('#customCard').innerHTML = getTemplate(this.config); // 生成 HTML 模版内容
    }
    updateStyle() {
        this.shadowRoot.querySelector('style').textContent = style;
    }
}
// 定义组件
if (!customElements.get(Selector)) {
    customElements.define(Selector, UICard);
}

export { UIAvatar, UICard };
