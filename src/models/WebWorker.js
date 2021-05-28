export class WebWorker {
	constructor(worker) {
		this.worker = new worker();
		return this;
	}

	dispose() {
		this.worker.terminate()
	}
}