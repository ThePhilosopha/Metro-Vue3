# vue-metro-tile

[![npm](https://img.shields.io/npm/v/vue-metro-tile.svg?style=flat-square)](https://www.npmjs.com/package/vue-metro-tile) [![GitHub issues](https://img.shields.io/github/issues/yuanfux/vue-metro-tile.svg?style=flat-square)](https://github.com/yuanfux/vue-metro-tile/issues) [![GitHub closed issues](https://img.shields.io/github/issues-closed/yuanfux/vue-metro-tile.svg?style=flat-square)](https://github.com/yuanfux/vue-metro-tile/issues?q=is%3Aissue+is%3Aclosed) ![NpmLicense](https://img.shields.io/npm/l/vue-metro-tile.svg?style=flat-square)

<p align="center">
  <img width="150" height="150" src="https://user-images.githubusercontent.com/6414178/45662644-3a441000-bb35-11e8-8e72-e6ed618a733d.png">
</p>

## Preview
View [Demo](https://yuanfux.github.io/vue-metro-tile/)
> The demo is empowered by `vue-metro-tile` & `vue-grid-layout-plus`

Vue Metro Tile is a Vue 3 component for building Windows 10 like metro layout in modern browser.
The component currently has the following features:
1. Customized tile content
2. 3D tile rotation
3. Glare effect when hovering or clicking
4. Tilt effect when mouse holds down

> **Note:** Version 2.x supports Vue 3. For Vue 2, use version 1.x.

## Install
```
npm install vue-metro-tile --save
```
or
```
yarn add vue-metro-tile
```

## Import
```js
// Global registration
import { createApp } from 'vue'
import MetroTile from 'vue-metro-tile'
import 'vue-metro-tile/dist/style.css'

const app = createApp(App)
app.use(MetroTile)
app.mount('#app')
```
or
```js
// Local registration in a component
import { MetroTile } from 'vue-metro-tile'
import 'vue-metro-tile/dist/style.css'
```

## Usage
> A blue metro tile with simple texts on 4 faces (Vue 3 slot syntax)
```html
<MetroTile
    @click="handleClick($event)" 
    :faceStyle="{'background-color': 'blue'}"
    >
  <template #front>
    front
  </template>
  <template #back>
    back
  </template>
  <template #top>
    top
  </template>
  <template #bottom>
    bottom
  </template>
</MetroTile>
```

## Props

```typescript
// style object for all 6 faces
// this prop has a lower priority than specific face style
faceStyle?: object;

// style object for front face
frontStyle?: object;

// style object for back face
backStyle?: object;

// style object for left face
leftStyle?: object;

// style object for right face
rightStyle?: object;

// style object for top face
topStyle?: object;

// style object for bottom face
bottomStyle?: object;

// the width of square prism in px
width?: number = 200;

// the height of square prism in px
height?: number = 200;

// the rotation along X axis in degree
rotateX?: number = 0;

// the perspective of square prism container in px
perspective?: number = 750;

// the max tilt angle in degree along the X axis
maxTiltX?: number = 20;

// the max tilt angle in degree along the Y axis
maxTiltY?: number = 10;

// the initial glare size when clicking 
clickGlareSize?: number = 90;

// the glare opacity when clicking
clickGlareOpacity?: number = 0.15;

// the glare opacity when hovering
hoverGlareOpacity?: number = 0.3;
```

## Slots

 - `front`
 - `back`
 - `left`
 - `right`
 - `top`
 - `bottom`

> **Vue 3 Note:** Use `#slotName` or `v-slot:slotName` syntax instead of the Vue 2 `slot="slotName"` syntax.

## Events

 - `click`
 - `touchmove`

## Browser compatibility

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" /><br/>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" /><br/>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" /><br/>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" /><br/>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" /><br/>Opera |
| :----: | :----: | :----: | :----: | :----: |
| latest | latest | latest | latest | latest |

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build demo
npm run build

# Build library
npm run build-lib
```

## Migration from v1 (Vue 2) to v2 (Vue 3)

- Slot syntax changed: `slot="front"` → `#front` or `v-slot:front`
- Lifecycle hooks renamed: `beforeDestroy` → `onBeforeUnmount`
- Import syntax changed: `import Vue from 'vue'` → `import { createApp } from 'vue'`
- Component registration uses `app.use()` or local import pattern
- Built with Vite instead of Vue CLI

## License
MIT