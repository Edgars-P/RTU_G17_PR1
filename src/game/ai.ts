import type { GameManager } from "./board";

export interface AiMove {
	index: number;
}

// Pamata AI klase
export abstract class Ai {
	// Kopīga implementācija simulācijām, grafiem, utt. ja nepieciešams
	constructor() {}

	// Saņem spēles stāvokli un atgriež gājienu
	abstract evaluate(manager: GameManager): AiMove;
}
