const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const holidaySchema = mongoose.Schema({
  employee: { type: String, required: true},
  dateRange: { start: {type: String, required: true},end: {type: String, required: true}},
  holidayType: { type: String, required: true},
  holidayStatus: { type: String, required: true},
}
);

async function main() {
  await mongoose.connect("mongodb://localhost:27017/Holidays_request_tool");
}
main().catch((err) => console.log(err));
const holiday = mongoose.model("holiday", holidaySchema);

const app = express();
app.use(cors());
app.use(express.json());
var ObjectId = require("mongodb").ObjectID;

app.get("/api/requestHoliday", async (req, res) => {
  const holidays = await holiday.find({});
  res.json(holidays);
});

app.post("/api/requestHoliday", async (req, res) => {
  const request  = new holiday(req.body);
  try {
    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.delete("/api/requestHoliday/:id", async (req, res) => {
  holiday.deleteOne({ _id: ObjectId(req.params.id) }, (error, result) => {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      res.json({ success: false, message: "error" });
    }
    res.statusCode = 200;
    res.json({ success: true, message: "document deleted" });
  });
});

app.listen(3000, () =>
  console.log("browse http://localhost:3000/api/requestHoliday")
);
