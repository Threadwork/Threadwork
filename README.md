# Threadwork

```
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
```
