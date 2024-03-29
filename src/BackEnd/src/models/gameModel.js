import mongoose from "mongoose";


const gameSchema = new mongoose.Schema({
    date: {type:"String", require: true},
    playersPlaying: [{type: mongoose.ObjectId, ref: 'players' , require: true}],
    isFinished: {type: "Boolean", default: false},
    winner: {type: mongoose.ObjectId},
    runnerUp: {type: mongoose.ObjectId},
    firstEliminated: {type: mongoose.ObjectId},
    secondEliminated: {type: mongoose.ObjectId},
});
  
// Create Mongoose Model for game data
const gameModel = mongoose.model("games", gameSchema);

export default gameModel;
