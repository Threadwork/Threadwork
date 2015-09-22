var EJS = {};
EJS.template = function(templateString, args) {
    new Thread({templateString, args}, (e) => {
        var cache = {};
        var tmpl = function tmpl(str, data) {
            var fn = !/\W/.test(str) ?
                cache[str] = cache[str] :
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" +
                    str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'") + "');}return p.join('');");
            return data ? fn(data) : fn;
        };
        postMessage(tmpl(e.data.templateString, e.data.args));
    }, (e) => {
        console.log(e.data);
    });
};

EJS.template("<%= title %>", { title: "Hello World" });
