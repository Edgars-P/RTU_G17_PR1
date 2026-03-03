import type { Ai, AiBoard, AiMove } from "./ai";
import type { GameManager } from "./board";

export class AiMinMax implements Ai {
	evaluate(manager: GameManager): AiMove {
		// TODO MinMax algoritms
		return { index: 0 };
	}
}
