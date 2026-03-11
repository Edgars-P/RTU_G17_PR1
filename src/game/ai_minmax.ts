import { Ai, type AiMove } from "./ai";
import type { GameManager } from "./board";

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
function minmax(manager: GameManager, depth: number, nodes: { count: number }): number {
	nodes.count++;

	const endState = manager.isEnd();
	if (endState === "AI_WIN") return 1000;
	if (endState === "USER_WIN") return -1000;
	if (endState === "DRAW") return 0;

	if (depth === 0) return heuristic(manager);

	if (isAiTurn(manager)) {
		let best = -Infinity;
		for (let i = 0; i < manager.boardLength - 1; i++) {
			const sim = manager.clone();
			sim.replace(i);
			best = Math.max(best, minmax(sim, depth - 1, nodes));
		}
		return best;
	} else {
		let best = Infinity;
		for (let i = 0; i < manager.boardLength - 1; i++) {
			const sim = manager.clone();
			sim.replace(i);
			best = Math.min(best, minmax(sim, depth - 1, nodes));
		}
		return best;
	}
}

export class AiMinMax extends Ai {
	nodes = 0;
	lastMoveTime = 0;
    evaluate(manager: GameManager): AiMove {
        const nodes = { count: 0 };
        let bestScore = -Infinity;
        let bestIndex = 0;

        const start = performance.now();

        for (let i = 0; i < manager.boardLength - 1; i++) {
            const sim = manager.clone();
            sim.replace(i);
            const score = minmax(sim, MAX_DEPTH - 1, nodes);
            if (score > bestScore) {
                bestScore = score;
                bestIndex = i;
            }
        }

        this.lastMoveTime = performance.now() - start;
        this.nodes = nodes.count;

		// Izvada informāciju par izpildes laiku un apmeklēto virsotņu skaitu
        console.log("MinMax virsotnes:", this.nodes, "laiks:", this.lastMoveTime.toFixed(2), "ms");	
        return { index: bestIndex };
    }
}