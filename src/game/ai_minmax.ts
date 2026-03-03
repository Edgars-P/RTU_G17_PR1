import { Ai, type AiMove } from "./ai";
import type { GameManager } from "./board";

export class AiMinMax extends Ai {
	evaluate(manager: GameManager): AiMove {
		// TODO MinMax algoritms
		return { index: 0 };
	}
}
