# Skyguru Weather App

Skyguru - the simple wheather app which helps user to follow weather in any place of the planet.

## Available scripts
```
"ios:dev": "react-native run-ios --device 'iPhone Nazar'",
"start:both": "react-native run-ios --device 'iPhone Nazar' && react-native run-android",
```
These scripts are running spicified devices\
**Important!** Before use custom scripts don't it's necessary to change *--device 'iPhone Nazar'* to your's one or remove at all

```
"lint:fix": "eslint . --fix '**/*.{ts,tsx}'",
```
This script fixes eslint errors in the entire project. Also, it has important property to sort imports. So it should be ran before pushing
 
```
"test:update": "jest --verbose --updateSnapshot",
```
This feature helps to follow tests running and update snapshots

## Writing and running tests
This project is set up to use jest for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called ```__tests__``` or with the ```.test``` extension to have the files loaded by jest. See any test template in project for an example test.

## Common issues
As the app is comparatively small it decreases risk to catch one to the minimum. Most of packages or metro issues can be solved after compliting these steps
+ remove ```node_modules``` folder
+ remove app from device
+ run ```yarn```
+ run ```pod install``` inside *ios* folder
+ run the app with ```--reset-cache``` marker
