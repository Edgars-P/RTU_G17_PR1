import type { GameManager } from "./board";
import type { TreeNode } from "./tree";

export interface AiMove {
	index: number;
}

// Pamata AI klase
export abstract class Ai {
	// Glabā pēdējo izveidoto spēles koku.
	lastTree: TreeNode | null = null;

	// Kopīga implementācija simulācijām, grafiem, utt. ja nepieciešams
	constructor() {}

	// Saņem spēles stāvokli un atgriež gājienu
	abstract evaluate(manager: GameManager): AiMove;
}
