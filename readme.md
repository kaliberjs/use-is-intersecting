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
export default function App() {
  const [root, setRoot] = React.useState(null)
  const { ref: isIntersectingRef, isIntersecting } = useIsIntersecting({ root, rootMargin })
  const { ref: wasIntersectingRef, wasIntersecting } = useWasIntersecting({ root, rootMargin })

  const rootMarginStyles = visualizeRootMargin(rootMargin)

  return (
    <div>
      <div className={styles.scrollWrapper}>
        <div className={styles.rootMargin} style={rootMarginStyles} />

        <div ref={setRoot} className={styles.scroll}>
          <div ref={isIntersectingRef}>
            {isIntersecting ? 'Is in intersection root element' : 'Is not in intersection root element'}
          </div>

          <div ref={wasIntersectingRef} >
            {wasIntersecting ? 'Has been in intersection root element' : 'Has not yet been in intersection root element'}
          </div>
        </div>
      </div>
    </div>
  )
}
```

To use the rootMargin visualiser, make sure the component you apply these styles on wraps the root element and has the same dimensions (check the example folder).
```css
.rootMargin {
  position: relative;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
  }

  &::before {
    top: 0;
    bottom: 0;
    left: inherit;
    right: inherit;
    border-left: 1px solid lime;
    border-right: 1px solid orange;
  }

  &::after {
    left: 0;
    right: 0;
    top: inherit;
    bottom: inherit;
    border-top: 1px solid lime;
    border-bottom: 1px solid orange;
  }
}
```

![](https://media.giphy.com/media/H9TLJHctw7Efm/giphy.gif)

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk. It does not import React, but expects it to be provided, which [@kaliber/build](https://kaliberjs.github.io/build/) can handle for you.

This library is not transpiled.
