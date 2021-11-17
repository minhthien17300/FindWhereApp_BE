const defaultModel = {
    date: { type: Date },
    string: { type: String, default: "" },
    stringR: { type: String, required: true },
    stringRef: { type: String, required: true, match: /^[a-fA-F0-9]{24}$/ },
    stringPhone: { type: String, required: true, match: /^0\d{9}$/ },
    stringUnique: { type: String, required: true, unique: true },
    array: { type: Array, default: [] },
    number: { type: Number, default: 0 },
    boolean: { type: Boolean, default: true },
    booleanFalse: { type: Boolean, default: false },
    object: { type: Object, default: {} },
    stringImage: { type: String },
    stringEvaluate: { type: String, default: "Unknown" },
  };
  const defaultRoles = {
    User: 0,
    Admin: 1
  }
  
  const defaultGender = {
    Male: 0,
    Female: 1,
    Unknown:2
  }
  
  const defaultStatus = {
    ACTIVE: true,
    BAN: false,
  }

  const defaultGameStatus = {
    VeryPositive: "Very Positive",
    Positive: "Positive",
    Mixed: "Mixed",
    Negative: "Negative",
    VeryNegative: "Very Negative"
  }
  
  module.exports ={
    defaultModel,
    defaultRoles,
    defaultGender,
    defaultStatus,
    defaultGameStatus
  }