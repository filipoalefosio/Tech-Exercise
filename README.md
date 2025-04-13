# This is a test suite for the Automation Exercise web page

If new to this project, it is recommended to work your way through the [Getting_Started.md](https://github.com/filipoalefosio/Tech-Exercise/blob/main/Getting_Started.md#:~:text=**-,Purpose,-of%20this%20document) doc 


# Quick setup 

### Run the below command to pull the repo

 git clone https://github.com/filipoalefosio/Tech-Exercise.git

### Command into the project test folder to run/view the test scripts 

cd Tech-Exercise/tests/ui_tests

### Install dependancies (If you don't have them already you may need to install)

 npm install 

### If the above doesn't work and keeps saying command not found run the below command 

#### Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

##### in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

##### Download and install Node.js:
nvm install 22

##### Verify the Node.js version:
node -v # Should print "v22.14.0".
nvm current # Should print "v22.14.0".

##### Verify npm version:
npm -v # Should print "10.9.2".

### Playwright will need to be installed to be able to run the tests

npm init playwright@latest

### You will also need faker installed to be able to use the module (run command below)

npm i @faker-js/faker


### Run tests (note: ensure you're in the ui_tests folder to run the tests)

 npm test

#### If you're wanting to run specific test (note: ensure you're in the ui_tests folder)

npm test my-specific-test.spec.ts (example file name)

### If you're wanting to run in headed mode (note: ensure you're in ui_tests folder)

npx playwright test --headed

### If the test doesn't produce a report you can run this command to view it.

npx playwright show-report
