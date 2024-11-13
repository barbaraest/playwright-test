# Dependencies
run to install all dependencies:
- npm install
- npx playwright install

# Run tests
you can run tests with those commands bellow:
- run tests on terminal:
  - npx playwright test
- open playwright interface:
  - npx playwright test --ui
- run tests in all browsers in the same time
  - npx playwright test --headed --browser=all
- runs specific test spec
  - npx playwright test tests/login.spec.ts
- run specific test 
  - npx playwright test -g "login with sucess"
- after run your tests you can run the command bellow and it will generate a report about your tests 
  - npx playwright show-report

# Configurations 
If you want to start a completely new project you must run the commands bellow:
- npm install
- npm init -y
- npm i -D @playwright/test
- npx playwright install

