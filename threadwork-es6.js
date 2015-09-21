(function(window, document, undefined) {
  "use strict";
  let _ = _ || {};

  /**
   * Description of the function
   * @param  {object} payload
   * @param  {function} workerFunction
   * @param  {function} readyFunction
   * @return {Worker} worker
   */
  _.worker = function(payload, workerFunction, readyFunction) {
    let fallback = function() {
      workerFunction();
      readyFunction();
      return null;
    }

    if (window.Worker) {
      let blob, worker, url, blobbuilder, webWorker = function(blob) {
        worker = new Worker(url.createObjectURL(blob));
        worker.onmessage = readyFunction;
        worker.postMessage(payload);
      };

      url = window.URL || window.webkitURL;
      workerFunction = "this.onmessage=" + workerFunction.toString();

      if (window.Blob) {
        blob = new Blob([workerFunction], {
          type: "application/javascript"
        });
      } else {
        blobbuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        if (blobbuilder) {
          blob = (blobbuilder).append(workerFunction).getBlob();
        }
      }

      if (blob) {
        worker = webWorker(blob);
        return worker;
      } else return fallback();
    } else return fallback();
  };
})(window, document);
