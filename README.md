# This is a test suite for the Automation Exercise web page

If new to this project, it is recommended to work your way through the [Getting_Started.md](https://github.com/filipoalefosio/Tech-Exercise/blob/main/Getting_Started.md#:~:text=**-,Purpose,-of%20this%20document) doc 


# Quick setup 

### Run the below command to pull the repo

 git clone https://github.com/filipoalefosio/Tech-Exercise.git

### Command into the project folder

 cd automationExercise

### Install dependancies

 npm install 

### Run tests (note: ensure you're in the ui_tests folder to run the tests)

 npm test

#### If you're wanting to run specific test (note: ensure you're in the ui_tests folder)

npm test my-specific-test.spec.ts (example file name)

### If you're wanting to run in headed mode (note: ensure you're in ui_tests folder)

npx playwright test --headed
