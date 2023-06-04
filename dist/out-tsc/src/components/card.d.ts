declare class DefaultConfig {
    name: string;
    id: string;
    position: string;
    desc: string;
}
export declare class UICard extends HTMLElement {
    static get observedAttributes(): string[];
    config: DefaultConfig;
    get 'ui-name'(): string;
    set 'ui-name'(value: string);
    get 'ui-id'(): string | number;
    set 'ui-id'(value: string | number);
    get 'ui-position'(): string;
    set 'ui-position'(value: string);
    get 'ui-desc'(): string;
    set 'ui-desc'(value: string);
    constructor();
    render(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(): void;
    adoptedCallback(): void;
    updateConfig(): void;
    updateStyle(): void;
}
export {};
