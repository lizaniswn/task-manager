exports.getTasks = (req, res) => {
  res.json([
    { id: 1, task: "Complete React project", owner: req.user },
    { id: 2, task: "Review pull requests", owner: req.user }
  ]);
};
