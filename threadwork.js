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
    var fallback = function fallback() {
      workerFunction();
      readyFunction();
      return null;
    };

    if (window.Worker) {
      var _ret = (function () {
        var blob = undefined,
            worker = undefined,
            url = undefined,
            blobbuilder = undefined,
            webWorker = function webWorker(blob) {
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
            blob = blobbuilder.append(workerFunction).getBlob();
          }
        }

        if (blob) {
          worker = webWorker(blob);
          return {
            v: worker
          };
        } else return {
            v: fallback()
          };
      })();

      if (typeof _ret === "object") return _ret.v;
    } else return fallback();
  };
})(window, document);
