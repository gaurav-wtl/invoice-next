import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the document
interface IID extends Document {
  aimcabId: number;
  wtlId: number;
}

// Define the schema
const idSchema: Schema = new Schema({
  aimcabId: {
    type: Number,
    default:0
  },
  wtlId: {
    type: Number,
    default:0
  },
},{
  timestamps:true
});

// Create the model
const ID = mongoose.models.ID || mongoose.model<IID>('ID', idSchema);

export default ID;
