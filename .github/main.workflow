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
  uses = "actions/heroku@master"
  needs = ["Heroku Login"]
  args = ["container:push", "--app", "$HEROKU_APP", "web"]
  secrets = ["HEROKU_API_KEY"]
  env = {
    HEROKU_APP = "murmuring-earth-23337"
  }
}
