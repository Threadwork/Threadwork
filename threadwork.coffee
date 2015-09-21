_ = {}

_.worker = (payload, workerFunction, readyFunction) ->
  window.URL = window.URL or window.webkitURL
  response = "self.onmessage=" + workerFunction.toString()
  blob = undefined
  try
    blob = new Blob([ response ], type: "application/javascript")
  catch e
    window.BlobBuilder = window.BlobBuilder or window.WebKitBlobBuilder or window.MozBlobBuilder
    blob = (new BlobBuilder).append(response).getBlob()
  worker = new Worker(URL.createObjectURL(blob))
  worker.onmessage = readyFunction
  worker.postMessage payload
  return

#Example
_.worker { Parameter: "123" }, ((e) ->
  Args = e.data
  postMessage Result: Args.Parameter
  return
), (e) ->
  Payload = e.data
  console.log Payload.Result
  return
