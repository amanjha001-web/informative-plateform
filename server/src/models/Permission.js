import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    resource: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

permissionSchema.index({ resource: 1, action: 1 }, { unique: true });

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
