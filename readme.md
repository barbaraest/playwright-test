# Dependencies
run to install all dependencies
- npm install

# Run tests
you can run tests with those commands bellow
- npx playwright test
- npx playwright test --ui //open playwright interface 
- npx playwright show-report
- npx playwright test --headed --browser=all  //run tests in all browsers in the same time
- npx playwright test/test.spec.js //runs specific test spec
- npx playwright test -g "login with sucess" //run specific test 

# Configurations 
If you want to start a completely new project you must run the commands bellow
- npm install
- npm init -y
- npm i -D @playwright/test
- npx playwright install

