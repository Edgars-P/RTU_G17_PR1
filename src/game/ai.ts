export interface AiBoard {
	board: number[];
	points: number;
	bank: number;
}

export interface AiMove {
	index: number;
}

// Pamata AI klase
export class Ai {
	constructor() {
		// Initialize the AI
	}

	evaluate(board: AiBoard): AiMove {
		// TODO Implement AI logic to evaluate the board and return the best move
		return { index: 0 };
	}
}
