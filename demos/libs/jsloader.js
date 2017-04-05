var JSLoader = new (function() {
    var view = document.createElement("div");
    view.style.position = "fixed";
    view.style.left = "0px";
    view.style.top = "0px";
    view.style.fontFamily = "arial, sans-serif";
    view.style.color = "#CCCCCC";
    view.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    view.style.padding = "8px";
    window.addEventListener("load", function () {
        document.body.appendChild(view);
    });
    this.load = function(scripts) {
        log("loading assets...");
        _load(scripts, scripts.length);
    }
    function log(log) {
        view.innerHTML += log + "<br>";
    }
    function　_load(scripts, len) {
        if(scripts.length < 1) return;
        var elem = document.createElement("script");
        var script = scripts.shift();
        elem.src = script + "?cache=" + new Date().getTime();
        elem.type = "text/javascript";
        elem.onerror = elem.onload = function(e) {
            var msg = e.type.toLowerCase() == "error" ? "error" : "loaded";
            log("　(" + (len - scripts.length) + "/" + len + ") " + msg + " " + script);
            if (scripts.length < 1) log("complete(^o^)/");
            _load(scripts, len);
        }
        document.head.appendChild(elem);
    }
});