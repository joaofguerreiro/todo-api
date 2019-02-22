workflow "Build, Test & Deploy" {
  on = "push"
  resolves = [
    "Test",
    "GitHub Action for Heroku",
  ]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  uses = "actions/npm@master"
  args = "test"
  needs = ["Build"]
}

action "GitHub Action for Heroku" {
  uses = "actions/heroku@master"
  args = "login && push"
  needs = ["Build"]
  secrets = ["HEROKU_API_KEY"]
}
