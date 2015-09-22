class Thread {

  constructor(payload, workerFunction, readyFunction) {
    this.start(payload, workerFunction, readyFunction);
  }

  start(payload, workerFunction, readyFunction) {

    /* Fallback if there is any kind of trouble. */
    function fallback() {
      this.workerFunction();
      this.readyFunction();
      return null;
    }

    /* Check if there is a worker object. */
    if (window.Worker) {
      let blob, worker, blobbuilder,
        url = window.URL || window.webkitURL,
        webWorker = function(blob) {
          worker = new Worker(url.createObjectURL(blob));
          worker.onerror = (event) => {
            throw new Error(`${event.message} (${event.filename}:${event.lineno})`);
          }
          worker.onmessage = (e) => {
            readyFunction(e.data);
          };
          worker.postMessage(payload);
        };

      workerFunction = "this.onmessage=" + workerFunction.toString();

      /* Check if there is a blob object. */
      if (window.Blob) {
        blob = new Blob([workerFunction], {
          type: "application/javascript"
        });

      } else {
        /* If not, try to use the BlobBuilder */
        BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        blob = BlobBuilder && (new BlobBuilder()).append(workerFunction).getBlob();
      }

      /* If there is a blob, call the web worker. In other cases call the fallback. */
      return typeof blob !== "undefined" ? webWorker(blob) : fallback();

    } else return fallback();
  };
}
