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
  args = ["container:push", "--app", "$HEROKU_APP"]
  secrets = ["HEROKU_API_KEY"]
  env = {
    HEROKU_APP = "murmuring-earth-23337"
  }
}
