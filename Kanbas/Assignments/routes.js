import Database from "../Database/index.js";

export default function AssignmentRoutes(app) {

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignment = {
      ...req.body,
      _id: new Date().getTime().toString(),
      course: cid,
    };
    Database.assignments.push(assignment);
    res.status(201).send(assignment);
  });


  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = Database.assignments.filter(
      (assignment) => assignment.course === cid
    );
    res.send(assignments);
  });


  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const updatedAssignment = req.body;
    Database.assignments = Database.assignments.map((assignment) =>
      assignment._id === id ? { ...assignment, ...updatedAssignment } : assignment
    );
    res.sendStatus(204);
  });


  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    Database.assignments = Database.assignments.filter(
      (assignment) => assignment._id !== id
    );
    res.sendStatus(204);
  });
}
