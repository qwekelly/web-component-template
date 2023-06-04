declare class DefaultConfig {
    name: string;
    id: string;
    size: number;
    radius: number;
}
export declare class UIAvatar extends HTMLElement {
    static get observedAttributes(): string[];
    get 'ui-name'(): string;
    set 'ui-name'(value: string);
    get 'ui-id'(): string | number;
    set 'ui-id'(value: string | number);
    config: DefaultConfig;
    constructor();
    render(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(): void;
    adoptedCallback(): void;
    updateStyle(): void;
    renderTemplate(): string;
}
export {};
