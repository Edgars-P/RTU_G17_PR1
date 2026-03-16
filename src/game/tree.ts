import type { GameManager } from "./board";

/**
 * Struktūra, kas glabā "plakanu" spēles koka stāvokļa kopiju
 * ar mērķi atvieglot koka vizualizēšanu
 */
export type TreeStateSnapshot = {
    board: number[];
    boardLength: number;
    points: number;
    bank: number;
    turn: number;
    aiFirst: boolean;
}

/**
 * Struktūra, kas attēlo vienu mezglu spēles kokā
 */
export type TreeNode = {
    id: string;
    depth: number;
    moveIndex: number | null;   // null gadījumā tas ir saknes mezgls

    state: TreeStateSnapshot;
    manager: GameManager;

    children: TreeNode[];
    score?: number;
    alpha?: number;
    beta?: number;
    pruned?: boolean;   // norāda, vai mezgls, realizējot alfa-beta algoritmu, tika nogriezts
}

/**
 * Palīgfunkcija, kas no GameManager izveido vienkāršu "plakanu" stāvokļa kopiju,
 * lai spēles frontend nebūtu nepeiciešams lasīt klases metodes
 */
function snapshotState(manager: GameManager): TreeStateSnapshot {
    return {
        board: [...manager.board],
        boardLength: manager.boardLength,
        points: manager.points,
        bank: manager.bank,
        turn: manager.turn,
        aiFirst: manager.aiFirst,
    };
}

/**
 * Funkcija, kas izveido spēles koka mezglu, klonējot manager,
 * lai mezgla būtu neatkarīgs (neietekmētu citus mezglus)
 */
function createNode(
    manager: GameManager,
    depth: number,
    moveIndex: number | null,
    id: string
): TreeNode {
    const managerClone = manager.clone();

    return {
        id,
        depth,
        moveIndex,
        state: snapshotState(managerClone),
        manager: managerClone,
        children: [],
    };
}

/**
 * Funkcija, kas ģenerē koka sakni, izmantojot pašreizējo spēles stāvokli
 */
export function buildGameTree(
    manager: GameManager,
    maxDepth: number
): TreeNode {
    return buildNode(manager, 0, maxDepth, null, "root");
}

/**
 * Funkcija, kas rekursīvi ģenerē spēles koka mezglus līdz noteiktajam dziļumam
 */
function buildNode(
    manager: GameManager,
    depth: number,
    maxDepth: number,
    moveIndex: number | null,
    id: string
): TreeNode {
    const node = createNode(manager, depth, moveIndex, id);

    if (depth >= maxDepth) return node;

    if (node.manager.isEnd() !== false) return node;

    for (let i =0; i < node.manager.boardLength - 1; i++) {
        const simulator = node.manager.clone();

        simulator.replace(i);

        const childNode = buildNode(
            simulator,
            depth + 1,
            maxDepth,
            i,
            `${id}-${i}`
        );

        node.children.push(childNode);
    }

    return node;
}

/**
 * Palīgfunkcija, kas saskaita, cik mezglu pavisam ir kokā
 */
export function countNodes(root: TreeNode): number {
    let total = 1;

    for (const child of root.children) {
        total += countNodes(child);
    }

    return total;
}