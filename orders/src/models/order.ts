import mongoose from "mongoose";
import { TicketDoc } from "./ticket";

// Create user attribute interface
interface OrderAttr {
  userId: string;
  status: "created" | "cancelled" | "awaiting:payment" | "complete";
  expiresAt: Date;
  ticket: TicketDoc;
}

// Build function interface
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attr: OrderAttr): OrderDoc;
}

// Order document inteface
interface OrderDoc extends mongoose.Document {
  userId: string;
  status: "created" | "cancelled" | "awaiting:payment" | "complete";
  expiresAt: Date;
  ticket: TicketDoc;
}

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "created",
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
    userId: {
      type: String,
      required: true,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// build method for using mongoose with typescript
orderSchema.statics.build = (attr: OrderAttr) => {
  return new Order(attr);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
