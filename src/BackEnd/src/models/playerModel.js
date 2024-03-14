import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    f_name: { type: "String", require: true },
    l_name: { type: "String", require: true },
    n_name: { type: "String", require: true },
    mobile: { type: "String", require: true },
    password: { type: "String"},
    admin: { type: "Boolean", default: false, immuatble: true},
    gamesPlayed:{ type: "String", default: 0},
    wins: {type: "String", default:0},
    seconds: {type: "String", default:0},
    quadWins: {type: "String", default:0},

  });
  
  // Create Mongoose Model for user data
  const playerModel = mongoose.model("players", playerSchema);

  export default playerModel