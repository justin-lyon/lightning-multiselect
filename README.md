# lightning-multiselect
A field level Multiselect picklist component for Lightning

Requires [`LightningKit/js/promisify.js` Static Resource](https://github.com/jlyon87/lightning-kit)

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
