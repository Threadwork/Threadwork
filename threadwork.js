(function() {
  var _;

  _ = {};

  _.worker = function(payload, workerFunction, readyFunction) {
    var blob, e, response, worker;
    window.URL = window.URL || window.webkitURL;
    response = "self.onmessage=" + workerFunction.toString();
    blob = void 0;
    try {
      blob = new Blob([response], {
        type: "application/javascript"
      });
    } catch (_error) {
      e = _error;
      window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
      blob = (new BlobBuilder).append(response).getBlob();
    }
    worker = new Worker(URL.createObjectURL(blob));
    worker.onmessage = readyFunction;
    worker.postMessage(payload);
  };

  _.worker({
    Parameter: "123"
  }, (function(e) {
    var Args;
    Args = e.data;
    postMessage({
      Result: Args.Parameter
    });
  }), function(e) {
    var Payload;
    Payload = e.data;
    console.log(Payload.Result);
  });

}).call(this);
