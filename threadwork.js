(function (window, document, undefined) {
  "use strict";
  var _ = _ || {};

  /**
   * Description of the function
   * @param  {object} payload
   * @param  {function} workerFunction
   * @param  {function} readyFunction
   * @return {Worker} worker
   */
  _.worker = function (payload, workerFunction, readyFunction) {
    var blob = undefined,
        worker = undefined,
        url = undefined,
        blobbuilder = undefined;
    url = window.URL || window.webkitURL;
    workerFunction = "this.onmessage=" + workerFunction.toString();
    try {
      blob = new Blob([workerFunction], {
        type: "application/javascript"
      });
    } catch (error) {
      blobbuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
      blob = blobbuilder.append(workerFunction).getBlob();
    }
    worker = new Worker(url.createObjectURL(blob));
    worker.onmessage = readyFunction;
    worker.postMessage(payload);
    return worker;
  };
})(window, document);
