import { Ai, type AiMove } from "./ai";
import type { GameManager } from "./board";

export class AiAlphaBeta extends Ai {
	evaluate(manager: GameManager): AiMove {
		// TODO AlphaBeta algoritms
		return { index: 0 };
	}
}
