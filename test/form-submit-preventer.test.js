import FormSubmitPreventer from '../index';
import test from 'tape-rollup';
import Domodule from 'domodule';
import { findOne, fire, on } from 'domassist';

const calls = [];
let el;
let instance;

const setup = html => {
  calls.length = 0;

  el = document.createElement('form');
  el.innerHTML = html || '<button type="submit" data-module="FormSubmitPreventer"></button>';

  instance = new FormSubmitPreventer(findOne('button', el));
};

test('API', assert => {
  setup();
  assert.ok(FormSubmitPreventer.prototype instanceof Domodule, 'Is a domodule module');
  assert.end();
});

test('Errors', assert => {
  const notAButton = document.createElement('span');

  assert.throws(() => {
    new FormSubmitPreventer(notAButton);
  }, /The element needs to be a button/, 'Throws when element is not a button');

  const button = document.createElement('button');
  notAButton.appendChild(button);

  assert.throws(() => {
    new FormSubmitPreventer(button);
  }, /No form found/, 'Throws when there is no form');

  assert.end();
});

test('Disable on submit', assert => {
  setup();

  assert.notOk(instance.el.disabled, 'Button is not initially disabled');
  fire(el, 'submit');
  assert.ok(instance.el.disabled, 'Button is disabled after submit');

  on(el, 'submit', () => {
    assert.notOk(true, 'This should not happen');
  });
  fire(el, 'submit');
  assert.ok(true, 'Subsequent submit should be prevented');

  assert.end();
});

test('Re enable', assert => {
  setup();

  fire(el, 'submit');
  assert.ok(instance.el.disabled, 'Button is disabled');
  fire(el, 'enable');
  assert.notOk(instance.el.disabled, 'Button enabled with enable event');
  fire(el, 'submit');
  assert.ok(instance.el.disabled, 'Button is disabled');
  fire(el, 'formjax:success');
  assert.notOk(instance.el.disabled, 'Button enabled with formjax:success event');
  fire(el, 'submit');
  assert.ok(instance.el.disabled, 'Button is disabled');
  fire(el, 'formjax:error');
  assert.notOk(instance.el.disabled, 'Button enabled with formjax:error event');
  fire(el, 'submit');
  assert.ok(instance.el.disabled, 'Button is disabled');

  assert.end();
});

test('CSS class on disable', assert => {
  setup('<button type="submit" data-module="FormSubmitPreventer" data-module-disabled-class="disabled"></button>');

  assert.notOk(el.classList.contains('disabled'), 'Disabled class is not present');
  fire(el, 'submit');
  assert.ok(el.classList.contains('disabled'), 'Disabled class is now present');
  fire(el, 'enable');
  assert.notOk(el.classList.contains('disabled'), 'Disabled class removed after enabling');
  assert.end();
});
