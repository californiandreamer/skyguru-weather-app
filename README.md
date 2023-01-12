# Skyguru Weather App

Skyguru - the simple wheather app which helps user to follow weather in any place of the planet.

<div style={{ display: flex, jusify-content: space-between }}>
<img src="https://user-images.githubusercontent.com/67259677/207849470-dcdd8cf5-839a-4343-ab16-5018985827fc.PNG" width="400">
<img src="https://user-images.githubusercontent.com/67259677/207849450-0f33cae3-493f-473d-89fa-700f220f8ddf.PNG" width="400">
</div>

## Available scripts

```
"ios:dev": "react-native run-ios --device 'iPhone Nazar'",
"start:both": "react-native run-ios --device 'iPhone Nazar' && react-native run-android",
```

These scripts are running spicified devices\
**Important!** Before use custom scripts don't it's necessary to change _--device 'iPhone Nazar'_ to your's one or remove at all

```
"lint:fix": "eslint . --fix '**/*.{ts,tsx}'",
```

This script fixes eslint errors in the entire project. Also, it has important property to sort imports. So it should be ran before pushing

```
"test:update": "jest --verbose --updateSnapshot",
```

This feature helps to follow tests running and update snapshots

## Writing and running tests

This project is set up to use jest for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called `__tests__` or with the `.test` extension to have the files loaded by jest. See any test template in project for an example test.

## Common issues

As the app is comparatively small it decreases risk to catch one to the minimum. Most of packages or metro issues can be solved after compliting these steps

- remove `node_modules` folder
- remove app from device
- run `yarn`
- run `pod install` inside _ios_ folder
- run the app with `--reset-cache` marker
