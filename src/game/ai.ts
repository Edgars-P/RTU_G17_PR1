import type { GameManager } from "./board";

export interface AiMove {
	index: number;
}

// Pamata AI klase
export class Ai {
	constructor() {
		// Initialize the AI
	}

	evaluate(manager: GameManager): AiMove {
		// TODO Implement AI logic to evaluate the board and return the best move
		return { index: 0 };
	}
}
