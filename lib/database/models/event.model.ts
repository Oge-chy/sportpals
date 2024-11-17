import { Schema, Document, model, models} from "mongoose";

export interface IEvent extends Document {
    _id: string;  // MongoDB's unique ID for the event
    title: string;  // The title of the event
    description?: string;  // Optional description of the event
    location?: string;  // Optional location of the event
    createdAt: Date;  // Timestamp for when the event was created
    imageUrl: string;  // URL to an image related to the event
    startDateTime: Date;  // Start time of the event
    endDateTime: Date;  // End time of the event
    price: string;  // The price of the event
    registrationDeadline: Date;  // Deadline for event registration
    isFree: boolean;  // Flag indicating whether the event is free
    url?: string;  // Optional URL related to the event (e.g., event page)
    
    // Categories, levels, gender, and organizer are references to other documents
    category: { _id: string, name: string };  // Category related to the event
    level: { _id: string, name: string };  // Level related to the event
    gender: { _id: string, name: string };  // Gender specification for the event
    organizer: { _id: string, firstName: string, lastName: string };  // Organizer info, renamed LirstName to lastName
}
const EventSchema = new Schema({
   title: {type: String, required: true },
   description: {type: String },
   location: {type: String },
   createdAt: {type: Date, default: Date.now},
   imageUrl: {type: String, required: true },
   startDateTime: {type: Date, default: Date.now},
   endDateTime: {type: Date, default: Date.now},
   price: {type: String },
   registrationDeadline: {type: Date, default: Date.now},
   isFree: {type: Boolean, default: false},
   url: {type: String},
   category: {type: Schema.Types.ObjectId, ref: "Category"},
   level: {type: Schema.Types.ObjectId, ref: "Level"},
   gender: {type: Schema.Types.ObjectId, ref: "Gender"},
   Organizer: {type: Schema.Types.ObjectId, ref: "User"},

})

const Event = models.Event || model("Event", EventSchema);

export default Event;