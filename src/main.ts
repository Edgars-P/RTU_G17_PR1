import { AiAlphaBeta } from "./game/ai_alphabeta";
import { GameManager } from "./game/board";

// TODO Izvēlēties AI algoritmu
const selectedAi = AiAlphaBeta;
const aiFirst = true;
const boardLength = 20;

const manager = new GameManager(boardLength, aiFirst, new selectedAi());

// TODO UI
