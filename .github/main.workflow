workflow "Build & Test" {
  on = "push"
  resolves = ["Test"]
}

action "Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
  runs = "npm@master"
}

action "Test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm@master"
  args = "test"
  needs = ["Build"]
}
