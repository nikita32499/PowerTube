import { WorkerNode } from 'core/entities/worker';

export interface WorkerNodeRepository {
    workerNodeList: WorkerNode[];

    connectWorkerNode(workerNode: WorkerNode): boolean;
}
