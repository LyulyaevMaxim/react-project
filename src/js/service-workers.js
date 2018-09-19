/*eslint-disable*/
self.addEventListener('install', event => {
  console.log('Установлен')
  /* This is a great time to prepare the service worker to be used by initializing a cache. 
     Then cache the App Shell and static assets using the Cache API. */
})

self.addEventListener('activate', event => {
  console.log('Активирован')
  //здесь мы не можем взаимодействовать с загруженной страницей, но может быть полезно
  // когда пользователь перезагружает одну из открытых страниц,
  // либо взаимодействует с приложением
  // (очистка старых кэшей и файлов, которые обновлённой версией приложения не будут использоваться)
})

/*
 используем Cache API, чтобы проверить: был ли запрошенный URL уже сохранён в кэшированных ответах
 если был - возвращаем сохранённый ранее ответ, иначе - делаем запрос
*/
self.addEventListener('fetch', event => {
  console.log('Происходит запрос на сервер')
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        //entry found in cache
        return response
      }
      return fetch(event.request)
    })
  )
})

/*
  выведем пришедшее с backend'a push-уведомление
*/
self.addEventListener('push', event => {
  console.log('Received a push event', event)
  const options = {
    title: 'I got a message for you!',
    body: 'Here is the body of the message',
    icon: '/img/icon-192x192.png',
    tag: 'tag-for-this-notification',
  }
  event.waitUntil(self.registration.showNotification('', options))
})

// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//     window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
// )

// export default function register() {
//   if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//     // The URL constructor is available in all browsers that support SW.
//     const publicUrl = new URL(process.env.PUBLIC_URL, window.location)
//     if (publicUrl.origin !== window.location.origin) {
//       // Our service worker won't work if PUBLIC_URL is on a different origin
//       // from what our page is served on. This might happen if a CDN is used to
//       // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
//       return
//     }

//     window.addEventListener('load', () => {
//       const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`

//       if (isLocalhost) {
//         // This is running on localhost. Lets check if a service worker still exists or not.
//         checkValidServiceWorker(swUrl)

//         // Add some additional logging to localhost, pointing developers to the
//         // service worker/PWA documentation.
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             'This web app is being served cache-first by a service ' +
//               'worker. To learn more, visit https://goo.gl/SC7cgQ'
//           )
//         })
//       } else {
//         // Is not local host. Just register service worker
//         registerValidSW(swUrl)
//       }
//     })
//   }
// }

// function registerValidSW(swUrl) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then(registration => {
//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === 'installed') {
//             if (navigator.serviceWorker.controller) {
//               // At this point, the old content will have been purged and
//               // the fresh content will have been added to the cache.
//               // It's the perfect time to display a "New content is
//               // available; please refresh." message in your web app.
//               console.log('New content is available; please refresh.')
//             } else {
//               // At this point, everything has been precached.
//               // It's the perfect time to display a
//               // "Content is cached for offline use." message.
//               console.log('Content is cached for offline use.')
//             }
//           }
//         }
//       }
//     })
//     .catch(error => {
//       console.error('Error during service worker registration:', error)
//     })
// }

// function checkValidServiceWorker(swUrl) {
//   // Check if the service worker can be found. If it can't reload the page.
//   fetch(swUrl)
//     .then(response => {
//       // Ensure service worker exists, and that we really are getting a JS file.
//       if (
//         response.status === 404 ||
//         response.headers.get('content-type').indexOf('javascript') === -1
//       ) {
//         // No service worker found. Probably a different app. Reload the page.
//         navigator.serviceWorker.ready.then(registration => {
//           registration.unregister().then(() => {
//             window.location.reload()
//           })
//         })
//       } else {
//         // Service worker found. Proceed as normal.
//         registerValidSW(swUrl)
//       }
//     })
//     .catch(() => {
//       console.log('No internet connection found. App is running in offline mode.')
//     })
// }

// export function unregister() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready.then(registration => {
//       registration.unregister()
//     })
//   }
// }
