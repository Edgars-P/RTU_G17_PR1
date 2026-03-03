import type { Ai, AiBoard, AiMove } from "./ai";
import type { GameManager } from "./board";

export class AiAlphaBeta implements Ai {
	evaluate(manager: GameManager): AiMove {
		// TODO AlphaBeta algoritms
		return { index: 0 };
	}
}
