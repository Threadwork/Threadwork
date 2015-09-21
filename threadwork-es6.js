let _ = _ || {};
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
};
