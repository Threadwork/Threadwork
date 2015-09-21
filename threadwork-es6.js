(function(window, document, undefined) {
  "use strict";
  let _ = _ || {};

  /**
   * Description of the function
   * @param  {object} payload
   * @param  {function} workerFunction
   * @param  {function} readyFunction
   * @return {Worker | null} worker
   */
  _.worker = function(payload, workerFunction, readyFunction) {

    /* Fallback if there is any kind of trouble. */
    let fallback = function() {
      workerFunction();
      readyFunction();
      return null;
    }

    /* Check if there is a worker object. */
    if (window.Worker) {
      let blob, worker, blobbuilder,
        url = window.URL || window.webkitURL,
        webWorker = function(blob) {
          worker = new Worker(url.createObjectURL(blob));
          worker.onmessage = readyFunction;
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
})(window, document);
