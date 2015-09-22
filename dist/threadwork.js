var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Thread = (function () {
  function Thread(payload, workerFunction, readyFunction) {
    _classCallCheck(this, Thread);

    this.start(payload, workerFunction, readyFunction);
  }

  _createClass(Thread, [{
    key: "start",
    value: function start(payload, workerFunction, readyFunction) {

      /* Fallback if there is any kind of trouble. */
      function fallback() {
        this.workerFunction();
        this.readyFunction();
        return null;
      }

      /* Check if there is a worker object. */
      if (window.Worker) {
        var _ret = (function () {
          var blob = undefined,
              worker = undefined,
              blobbuilder = undefined,
              url = window.URL || window.webkitURL,
              webWorker = function webWorker(blob) {
            worker = new Worker(url.createObjectURL(blob));
            worker.onerror = function (event) {
              throw new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");
            };
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
            blob = BlobBuilder && new BlobBuilder().append(workerFunction).getBlob();
          }

          /* If there is a blob, call the web worker. In other cases call the fallback. */
          return {
            v: typeof blob !== "undefined" ? webWorker(blob) : fallback()
          };
        })();

        if (typeof _ret === "object") return _ret.v;
      } else return fallback();
    }
  }]);

  return Thread;
})();
