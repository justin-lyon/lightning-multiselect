# lightning-multiselect
A screen reader compliant, field level Multiselect picklist component for Lightning with keyboard controls.

Requires [`LightningKit/js/promisify.js` Static Resource](https://github.com/jlyon87/lightning-kit)

## Demo

> Mouse and Keyboard controls

![multiselect demo gif](./multiselect-demo.gif)

## Usage

```html
<!-- MyComponent.cmp -->
<aura:component>
  <aura:attribute name="myMultipicklistValue" type="String" default="" />
  <c:Multiselect
    label="FieldLabel"
    value="{!v.myMultipicklistValue}"
    sObjectApiName="QuickText"
    fieldApiName="Channel" />
</aura:component>
```
