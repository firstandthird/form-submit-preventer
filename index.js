import Domodule from 'domodule';
import { on, closest, addClass, removeClass } from 'domassist';

class FormSubmitPreventer extends Domodule {
  get defaults() {
    return {
      disabledClass: ''
    };
  }

  postInit() {
    if (this.el.tagName !== 'BUTTON') {
      throw new Error('The element needs to be a button');
    }

    this.enabled = true;
    this.form = this.el.form || closest(this.el, 'form');

    if (!this.form) {
      throw new Error('No form found');
    }

    on(this.form, 'enable', this.enable.bind(this));
    on(this.form, 'formjax:success', this.enable.bind(this));
    on(this.form, 'formjax:error', this.enable.bind(this));

    /*
      This module is likely to get parsed AFTER any form handlers so let's try
      to catch the submit event o the capture phase and the button itself too.
     */
    on(this.form, 'submit', this.onFormSubmit.bind(this), true);
    on(this.el, 'click', this.onFormSubmit.bind(this), true);
  }

  onFormSubmit(event) {
    if (this.enabled) {
      this.disable();
    } else {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
  }

  enable() {
    this.switchState(true);
  }

  disable() {
    this.switchState(false);
  }

  switchState(enabled) {
    if (this.enabled === enabled) {
      return;
    }

    this.enabled = enabled;
    this.el.disabled = !enabled;

    if (this.options.disabledClass) {
      const method = enabled ? removeClass : addClass;
      method(this.form, this.options.disabledClass);
    }
  }
}

Domodule.register('FormSubmitPreventer', FormSubmitPreventer);

export default FormSubmitPreventer;
