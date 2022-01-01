const mongoose = require("mongoose");
const { unseenNotification } = require("../controllers/service/notification.service");

const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const notificationSchema = new Schema({
    id: { type: Number },
    to: {},
    title: { type: String },
    body: { type: String },
    seen: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "user" }
},
{
  timestamps: true,
});

notificationSchema.plugin(AutoIncrement, { inc_field: "id", id: "notificationId" });
module.exports = mongoose.model("notification", notificationSchema);
