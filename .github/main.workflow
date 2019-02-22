workflow "Build & Test" {
  on = "push"
  resolves = ["Test"]
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  uses = "docker://mongo"
  run = "npm test"
  # args = "test"
  needs = ["Build"]
}
