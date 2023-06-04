import { getCustomAttributes } from '../shard/utils';


class DefaultConfig {
  name: string;
  id: string;
  size: number;
  radius: number;
}

const colorArr = ['#FFC068', '#94D877', '#5CC2F8', '#77A4F9'];

const Selector = "ui-avatar"; // 组件标签名

export class UIAvatar extends HTMLElement {

  static get observedAttributes() {return ['ui-name', 'ui-id']; }

  get 'ui-name'() {
    return this.getAttribute('ui-name');
  }

  set 'ui-name'(value: string) {
    this.setAttribute('ui-name', value);
  }

  get 'ui-id'() {
    return this.getAttribute('ui-id');
  }

  set 'ui-id'(value: string | number) {
    this.setAttribute('ui-id', value.toString());
  }

  config: DefaultConfig = {
    name: '匿',
    id: '',
    size: 50,
    radius: 6,
  };

  constructor(){
    super();
    this.render(); // 统一处理组件初始化逻辑
  }

  render() {
    this.attachShadow({mode: 'open'});
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
    this.config = {...this.config, ...props};
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
if (!customElements.get(Selector)) {
  customElements.define(Selector, UIAvatar)
}
