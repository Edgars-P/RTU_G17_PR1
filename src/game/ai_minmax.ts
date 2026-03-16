import { Ai, type AiMove } from "./ai";
import type { GameManager } from "./board";
import { buildGameTree, countNodes, type TreeNode } from "./tree";

const MAX_DEPTH = 5; // Maksimālais dziļums, līdz kuram MinMax algoritms tiks izpildīts

// Funkcija, kas nosaka, vai tagad ir MI gājiens
function isAiTurn(manager: GameManager): boolean {
	return (
		(manager.aiFirst && manager.turn % 2 === 1) ||
		(!manager.aiFirst && manager.turn % 2 === 0)
	);
}
// Vienkārša heiristika, kas novērtē spēles stāvokli
function heuristic(manager: GameManager): number {
	const pointsGood = manager.points % 2 === 0 ? 1 : -1;
	const bankGood = manager.bank % 2 === 0 ? 1 : -1;
	const favorAi = manager.aiFirst ? 1 : -1;
	return favorAi * (pointsGood + bankGood) * 10;
}
// MinMax algoritms
function minmaxNode(node: TreeNode, stats: { evaluated: number }): number {
	stats.evaluated++;

	const endState = node.manager.isEnd();

	if (endState === "AI_WIN") {
		node.score = 1000;
		return node.score;
	}

	if (endState === "USER_WIN") {
		node.score = -1000;
		return node.score;
	}

	if (endState === "DRAW") {
		node.score = 0;
		return node.score;
	}

	/**
	 * Ja mezglam nav bērnu, sasniegts dziļuma limits vai
	 * mezgls ir strupceļa stāvoklis daļējā kokā
	 */
	if (node.children.length === 0) {
		node.score = heuristic(node.manager);
		return node.score;
	}

	if (isAiTurn(node.manager)) {
		let best = -Infinity;

		for (const child of node.children) {
			best = Math.max(best, minmaxNode(child, stats));
		}

		node.score = best;
		return node.score;
	} else {
		let best = Infinity;

		for (const child of node.children) {
			best = Math.min(best, minmaxNode(child, stats));
		}

		node.score = best;
		return node.score;
	}
}

export class AiMinMax extends Ai {
	generatedNodes = 0;
	evaluatedNodes = 0;
	lastMoveTime = 0;

    evaluate(manager: GameManager): AiMove {
        const start = performance.now();

		const root = buildGameTree(manager, MAX_DEPTH);
		this.lastTree = root;

		const stats = { evaluated: 0 };

		let bestScore = -Infinity;
		let bestIndex = 0;


        for (const child of root.children) {
            const score = minmaxNode(child, stats);
            
			if (score > bestScore) {
                bestScore = score;
                bestIndex = child.moveIndex ?? 0;
            }
        }

		this.generatedNodes = countNodes(root) - 1;		// skaitām bez saknes
		this.evaluatedNodes = stats.evaluated;
        this.lastMoveTime = performance.now() - start;

		// Izvada informāciju par izpildes laiku un apmeklēto virsotņu skaitu
        console.log("MinMax apmeklētās/novērtētās virsotnes:", this.evaluatedNodes, "laiks:", this.lastMoveTime.toFixed(2), "ms");	
        return { index: bestIndex };
    }
}