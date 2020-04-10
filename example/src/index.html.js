import App from '/domain/App?universal'
import javascript from '@kaliber/build/lib/javascript'
import stylesheet from '@kaliber/build/lib/stylesheet'
import polyfill from '@kaliber/build/lib/polyfill'
import './index.css'

export default (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <title>useIsIntersecting</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {javascript}
      {stylesheet}
      {polyfill(['default', 'IntersectionObserver'])}
    </head>
    <body>
      <App />
    </body>
  </html>
)
