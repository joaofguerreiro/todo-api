workflow "Build, Test & Deploy" {
  on = "push"
  resolves = [
    "Test",
    "Heroku Deploy",
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

action "Heroku Login" {
  uses = "actions/heroku@master"
  args = "container:login"
  needs = ["Build"]
  secrets = ["HEROKU_API_KEY"]
}

action "Heroku Deploy" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  needs = ["Heroku Login"]
  args = "push"
  secrets = ["HEROKU_API_KEY"]
}
