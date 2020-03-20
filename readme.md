# useIsIntersecting
Check whether an element intersects with its root element

## Motivation
Reports wether an element is intersecting a root element using the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). This is more performant and easier to use than listening to `scroll` and `resize` events and even responds to element resizing, which might not trigger these events. 

## Polyfill
The `IntersectionObserver` is [supported by most current browsers](https://caniuse.com/#search=intersectionobserver). If you need wider support, there is a [polyfill](https://www.npmjs.com/package/intersection-observer) available through polyfill.io.

Using @kaliberjs/build, you can add the following argument to the `polyfill()` call.
```
{polyfill(['default', 'IntersectionObserver'])}
```

Without, you can manually add the following script to your page (or include it in your build):
```
https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver
```

## Installation

```
yarn add @kaliber/use-is-intersecting
```

## Usage
```jsx
```

![](https://media.giphy.com/media/H9TLJHctw7Efm/giphy.gif)

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk. It does not import React, but expects it to be provided, which [@kaliber/build](https://kaliberjs.github.io/build/) can handle for you.

This library is not transpiled.
