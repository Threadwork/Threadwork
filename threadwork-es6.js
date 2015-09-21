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
    let blob, response, worker, url, blobbuilder;
    url = window.URL || window.webkitURL;
    response = "this.onmessage=" + workerFunction.toString();
    try {
      blob = new Blob([response], {
        type: "application/javascript"
      });
    } catch (error) {
      blobbuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
      blob = (blobbuilder).append(response).getBlob();
    }
    worker = new Worker(url.createObjectURL(blob));
    worker.onmessage = readyFunction;
    worker.postMessage(payload);
    return worker;
  };
})(window, document);
