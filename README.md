# React Project
Среда для эффективной frontend-разработки

Используемые проектом модули разбиты на следующие группы:
* <b>./package.json</b>:
всё для компиляции, сборки, линтов, тестов, деплоя и storybook
* <b>./server/package.json</b>:
простой сервер на ![Hapi](https://hapijs.com/)
* <b>./src/package.json</b>:
основные зависимости проекта, является корнем ![yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)
* <b>./src/js/<modules|utils>/package.json</b>:
модули конкретного компонента (напр, react-select)

### Main commands
* ```yarn install-packages``` установит все зависимости
* ```yarn upgrade-packages``` обновит их (![метод](https://yarnpkg.com/lang/en/docs/cli/upgrade-interactive/) работает неидеально - рекомендую потом проверять вручную)
* ```yarn start``` запустит dev-сервер и автоформатирование изменяемых файлов 
* ```yarn test``` прогонит тесты
* ```yarn lint:js & yarn lint:css``` прогонит линтеры, которые исправят, что смогут, остальное - придётся вручную (автоматически вызываются перед коммитом)
* ```yarn build``` соберёт production версию
* ```yarn server``` запустить её на production сервере
* ```yarn deploy``` зальёт её на бесплатный хостинг [Zeit Now](https://zeit.co/now): 
* ```yarn dockerbuild``` зальёт [docker](https://www.docker.com) контейнер
* ```yarn storybook:start```, ```yarn storybook:build``` для работы с собственной [библиотекой компонентов](https://storybook.js.org) 

### Used optimizations
* все файлы минифицированы (JS - [Terser](https://github.com/webpack-contrib/terser-webpack-plugin), CSS - [cssnano](https://cssnano.co/)) и сжаты [gzip](https://ru.wikipedia.org/wiki/Gzip)  
* реализовано разбиение на ["чанки"](https://webpack.js.org/plugins/split-chunks-plugin/), подгружаемые в момент использования, либо перед использованием (например, при наведении на кнопку, ведущую на другую страницу)
* скрипты грузятся параллельно благодаря [<b>defer</b>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
* основное начертание шрифта загружается с помощью [<b>rel="preload"</b>](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)

### Quality tools
* git hooks: при коммите файлы автоматически форматируются, запускаются проверки линтерами и тестами
* [browserslist](https://browserl.ist): список поддерживаемых нами браузеров будет использоваться другими инструментами
* статическая типизация с помощью [TypeScript](https://www.typescriptlang.org/)

## JS
* импортируйте без '../../..' используя алиасы (~css, ~img, ~store, ~constants, ...)

## CSS - самое полезное из PostCSS:
* поддержка SCSS функционала: каскад, переменные, циклы, ...
* современный сброс стилей от PostCSS Reset и удобные медиа запросы вида ($tablet <= width < $desktop)
* код на современном CSS с помощью postcss-preset-env и autoprefixer
* объединение @media запросов, сортировка z-index и минификация кода 

## Images
* любое изображение <b>./src/img/*</b> доступно как <b>~img/*</b> в любом [js, postcss]-файле проекта
* фоновые SVG [вшиваются](https://github.com/pavliko/postcss-svg) в css chunks


## HTML
* генерация страницы на основе шаблона, минификация и асинхронная загрузка всех ресурсов
