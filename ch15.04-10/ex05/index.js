customElements.define('inline-circle', class InlineCircle extends HTMLElement {
  connectedCallback() {
    this.style.borderRadius = '50%';
    this.style.border = 'solid black 1px';
    this.style.transform = 'translateY(10%)';
    
    if (!this.style.display) {
      this.style.display = 'inline-block';
    }

    if (!this.style.width) {
      this.style.width = '0.8em';
      this.style.height = '0.8em';
    }
  }

  static get observedAttributes() {
    return ['diameter', 'color', 'hidden'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'diameter':
        this.style.width = newValue;
        this.style.height = newValue;
        break;
      case 'color':
        this.style.backgroundColor = newValue;
        break;
      case 'hidden':
        this.style.display = newValue === 'true' ? 'none' : 'inline-block';
        break;
    }
  }

  get diameter() {
    return this.getAttribute('diameter');
  }

  set diameter(value) {
    this.setAttribute('diameter', value);
  }

  get color() {
    return this.getAttribute('color');
  }
  
  set color(value) {
    this.setAttribute('color', value);
  }

  get hidden() {
    return this.getAttribute('hidden');
  }
  
  set hidden(value) {
    this.setAttribute('hidden', value);
  }
})