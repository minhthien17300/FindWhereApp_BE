const defaultModel = {
    date: { type: Date },
    string: { type: String, default: "" },
    stringR: { type: String, required: true },
    stringRef: { type: String, required: true, match: /^[a-fA-F0-9]{24}$/ },
    stringPhone: { type: String, match: /^0\d{9}$/, default: "" },
    stringUnique: { type: String, required: true, unique: true },
    array: { type: Array, default: [] },
    number: { type: Number, default: 0 },
    boolean: { type: Boolean, default: true },
    booleanFalse: { type: Boolean, default: false },
    object: { type: Object, default: {} },
    stringImage: { type: String , default: "https://firebasestorage.googleapis.com/v0/b/findwhereapp-9f3ad.appspot.com/o/whotao_wa.png?alt=media&token=6e29082d-a02a-4930-92b8-dc228084367e"},
    stringEvaluate: { type: String, default: "Unknown" },
  };
  const defaultRoles = {
    User: 0,
    Admin: 1,
    Enterprise: 2,
    Shipper: 3
  }
  
  const defaultGender = {
    Male: 0,
    Female: 1,
    Unknown:2,
  }
  
  const defaultStatus = {
    ACTIVE: true,
    BAN: false,
  }
  
  module.exports ={
    defaultModel,
    defaultRoles,
    defaultGender,
    defaultStatus,
  }