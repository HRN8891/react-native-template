#!/usr/bin/env ts-node
const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs');
const os = require('os');
const spinner = ora('Optional libraries setup');
// spinner.start();

console.log('Lets install the depedency');
const questions = [
  {
    type: 'confirm',
    name: 'CodePush',
    message: 'Do you want CodePush feature in your app?',
    default: false,
    transformer: (answer) => (answer ? '👍' : '👎'),
  },
];

const PROJECT_PATH = process.cwd();
const PACKAGE_JSON_PATH = `${PROJECT_PATH}/src/app/App.tsx`;
const PROJECT_SRC_PATH = `${PROJECT_PATH}/src`

let content = ''

inquirer.prompt(questions).then((answers) => {
  console.log('answer', answers);
  if(answers.CodePush === true) {
    content = `import * as React from 'react';
    import {Provider} from 'react-redux';
    import {NavigationContainer} from '@react-navigation/native';
    
    import {store} from './src/store';
    import {navigationRef} from './src/navigation/root';
    
    import Navigation from './src/navigation';
    import ErrorBoundary from './src/components/ErrorBoundary';
    import ErrorWithRestartBtn from './src/components/ErrorWithRestartBtn';
    
    function App() {
      const handleError = () => {
        // log the error
      };
      return (
        <ErrorBoundary onError={handleError} FallbackComponent={ErrorWithRestartBtn}>
          <NavigationContainer ref={navigationRef}>
            <Provider store={store}>
              <Navigation />
            </Provider>
          </NavigationContainer>
        </ErrorBoundary>
      );
    }
    //Uncomment below two lines for OTA after adding env vars
    // const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};
    // App = codePush(codePushOptions)(App);
    
    export default App;`;
  
  }else {
    console.log("Its not required");
    content = `import React from 'react';
    import { Text, SafeAreaView } from 'react-native';
    
    const App = () => {
      return (
        <SafeAreaView>
          <Text>React Native Template</Text>
        </SafeAreaView>
      );
    };
    
    export default App;`    

  }
  fs.writeFile(PACKAGE_JSON_PATH, content, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });});
