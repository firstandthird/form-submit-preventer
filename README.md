# Form Submit Preventer

[Domodule](https://github.com/firstandthird/domodule) that prevents multiple form submission so one AJAX handler can't be fired multiple times by clicking on the
submit button. Integrates well with [Formjax](https://github.com/firstandthird/formjax).

## Example markup

```html
<!--
  Once the form is submitted, the button will be disabled
-->
<form>
  <!-- Form content -->
  <button type="submit"
          data-module="FormSubmitPreventer">
      Submit
  </button>
</form>

<!--
  Once the form is submitted, the button will be disabled
  and the "disabled" class will be applied to the form
-->
<form>
  <!-- Form content -->
  <button type="submit"
          data-module="FormSubmitPreventer"
          data-module-disabled-class="disabled">
      Submit
  </button>
</form>

```

## Options

| Option          | Default | Effect                                                                      |
|-----------------|---------|-----------------------------------------------------------------------------|
| `disabledClass` | `''`    | If set to any string, it will be added as a class to the form once disabled |

## Events

The following events will re-enable the button and allow submission. Useful for validation.

* `enable`
* `formjax:success`
* `formjax:error`
