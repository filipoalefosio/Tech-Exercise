** Purpose of this document **

This document provides instructions on how to set up, configure, and run the automated tests for the Tech Test website. 
It is intended for new team members and reviewers to understand and execute the test suite efficiently.

How to get the latest code?
  - You will need to clone the repo to your local machine, one of the ways to do it is run the command below (ensure you retrieved the correct URL for the repo from the repo green "code" button)
  - git clone https://github.com/filipoalefosio/Tech-Exercise.git (repository-url)
      - Once cloned command into the working folder
      - cd automationExercise (repository-folder)

Note: If you're unsure if you have the latest code run - #git pull or #git pull origin main


Setting up the environment/dependancies?
  - Prerequisites (Ensure you have the following installed)
      - Node.js (if not link here for installation: https://nodejs.org/en/download)
      - Playwright (if not installed link here: https://playwright.dev/docs/intro or can run this command: npm init playwright@latest)
      - npm (if not installed link here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm or can run this command: npm install -g npm) - Note: If you're not sure if you have it and wanting to check you can run: node -v or npm -v in your terminal.
      - Typescript (this typically comes with Playwright when you go through the setup/installation process)
      - esLint (you will need to run the below commands in your terminal to install esLint)
          - npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin (This is to install esLint with the TypeScript packages needed for the project)
          - npm init @eslint/config@latest (this is to initialise and configure esLint)
          - npx eslint . (this command is to run esLint to check your code)
       
  - Installing dependancies (not often it happens but sometimes dependancies can get missed if so you can run the command below to ensure it is up to date)
      - npm install
      - npx playwright install (this command is more if playwright browsers are not installed)
   

Environment Config
  - There are 2 different environments
      - Dev = https://automationexercise.com/
      - Test = https://test.automationexercise.com/
   
      - To set or specify an environment you can create an .env file with this in the file - ENV=dev #or test
   
Running the tests
  - To run all tests (run the below command)
      - npx playwright test
  - To run a targetted/specific test (run the command below)
      - npx playwright test tests/place-order.spec.ts
  - To have the test viewable (headed mode) Note: Test defaults to headless (Eg: runs in the background) 
      - npx playwright test --headed
  - To view the report/results of the tests that ran (Normally this automatically pops up but if not run the command below)
      - npx playwright show-report
  - To run all API tests (note: ensure you're in the api_test folder)
    - npx playwright test api_test
  - To run a specific API test (note: ensure you're in the api_test folder)
   - npx playwright test api_test/verifyLogin.spec.ts (example)


Troubleshooting
  - If your tests are not running ensure there are no typos in the command and ensure dependencies are install correctly.
  - If you're having environment issues check your .env file matches the details provided above in the environment setup.
      - Side note: I ran into an issue with faker not being included into the node_modules packages so ran # npm install @faker-js/faker --save-dev 
       

