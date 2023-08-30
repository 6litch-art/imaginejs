$.fn.serializeObject = function () {

    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Imagine = factory();
    }

})(this, function () {

    var Imagine = {};
        Imagine.version = '0.1.0';

    var Settings = Imagine.settings = {

        "debug"           : false,
        "disable"         : false,
        "responsive"      : true,

        "lazyload"        : true,
        "browser-level"   : false, // Prevent lazy loading at browser-level
        "threshold"       : "25%"
    };

    var Assets = Imagine.assets = {
        "error": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgdmVyc2lvbj0iMS4wIgogICB3aWR0aD0iMTUwLjExODc3cHQiCiAgIGhlaWdodD0iMTQ5LjY5MDk4cHQiCiAgIHZpZXdCb3g9IjAgMCAxNTAuMTE4NzcgMTQ5LjY5MDk4IgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIKICAgaWQ9InN2ZzEwIgogICBzb2RpcG9kaTpkb2NuYW1lPSJpbWFnZS1lcnJvci5zdmciCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlua3NjYXBlOmV4cG9ydC1maWxlbmFtZT0iZXJyb3ItaW1hZ2UtZ2VuZXJpYy5zdmciCiAgIGlua3NjYXBlOmV4cG9ydC14ZHBpPSI5NiIKICAgaW5rc2NhcGU6ZXhwb3J0LXlkcGk9Ijk2IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjIuMiAoYjBhODQ4NjUsIDIwMjItMTItMDEpIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzCiAgICAgaWQ9ImRlZnMxNCIgLz48c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9Im5hbWVkdmlldzEyIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgICBib3JkZXJvcGFjaXR5PSIwLjI1IgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiNkMWQxZDEiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB0IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjkxNjA2ODU5IgogICAgIGlua3NjYXBlOmN4PSIzMS4xMTEyMDgiCiAgICAgaW5rc2NhcGU6Y3k9IjExNi44MDM0OCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzMDkiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNDU2IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIzOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImcyNDI4IiAvPjxnCiAgICAgaWQ9ImcyNDI4IgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5LjA1NjQ1NywtMjguNDYxNzk3KSI+PGcKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuMSwwLDAsLTAuMSwtNDUsMjAwKSIKICAgICAgIGZpbGw9IiMwMDAwMDAiCiAgICAgICBzdHJva2U9Im5vbmUiCiAgICAgICBpZD0iZzgiPjxwYXRoCiAgICAgICAgIGQ9Im0gOTc1LDExOTUgYyAtNSwtMiAtMjIsLTYgLTM4LC05IC00OCwtMTEgLTEwNSwtNzIgLTEyMywtMTMyIC0xNCwtNDkgLTE0LC01OSAwLC0xMDggMTEsLTM4IDI3LC02NCA1NCwtODggMTA5LC05OCAyNzcsLTUxIDMxOCw4OSAxNCw0OCAxNCw1OCAwLDEwNiAtMTksNjUgLTY2LDExMyAtMTMxLDEzMyAtNDgsMTQgLTYxLDE1IC04MCw5IHogbSAxMjIsLTYzIGMgNjYsLTQ3IDgzLC0xNjIgMzUsLTIyOSAtNDcsLTY2IC0xNjIsLTgzIC0yMjksLTM1IC05Miw2NSAtODAsMjI1IDE5LDI3NiA0NiwyMyAxMzQsMTcgMTc1LC0xMiB6IgogICAgICAgICBpZD0icGF0aDIiIC8+PHBhdGgKICAgICAgICAgZD0ibSA5ODAsMTA0MCBjIDAsLTUzIDIsLTYwIDIwLC02MCAxOCwwIDIwLDcgMjAsNjAgMCw1MyAtMiw2MCAtMjAsNjAgLTE4LDAgLTIwLC03IC0yMCwtNjAgeiIKICAgICAgICAgaWQ9InBhdGg0IiAvPjxwYXRoCiAgICAgICAgIGQ9Im0gOTgwLDkyMCBjIDAsLTEzIDcsLTIwIDIwLC0yMCAxMywwIDIwLDcgMjAsMjAgMCwxMyAtNywyMCAtMjAsMjAgLTEzLDAgLTIwLC03IC0yMCwtMjAgeiIKICAgICAgICAgaWQ9InBhdGg2IiAvPjwvZz48cGF0aAogICAgICAgaWQ9InBhdGg5MTciCiAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6Izc1NzU3NTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MC43NSIKICAgICAgIGQ9Ik0gNTUuOTEwNjcsODguMTAzNDk2IEEgMTUuNjk3MTA0LDE1LjQwNjQxNyAwIDAgMCA0MC4yMTMzOTksMTAzLjUwOTI2IDE1LjY5NzEwNCwxNS40MDY0MTcgMCAwIDAgNTUuOTEwNjcsMTE4LjkxNTAyIDE1LjY5NzEwNCwxNS40MDY0MTcgMCAwIDAgNzEuNjA3OTMsMTAzLjUwOTI2IDE1LjY5NzEwNCwxNS40MDY0MTcgMCAwIDAgNTUuOTEwNjcsODguMTAzNDk2IFogbSAwLjEwNjkzLDMuMjE2Nzk3IEEgMTIuMTExOTYzLDEyLjQwMjY1MSAwIDAgMSA2OC4xMjg5MywxMDMuNzIzMTIgMTIuMTExOTYzLDEyLjQwMjY1MSAwIDAgMSA1Ni4wMTc2LDExNi4xMjU5NiAxMi4xMTE5NjMsMTIuNDAyNjUxIDAgMCAxIDQzLjkwNjI3MSwxMDMuNzIzMTIgMTIuMTExOTYzLDEyLjQwMjY1MSAwIDAgMSA1Ni4wMTc2LDkxLjMyMDI5MyBaIiAvPjxyZWN0CiAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6Izc1NzU3NTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MC43NSIKICAgICAgIGlkPSJyZWN0MTcwMyIKICAgICAgIHdpZHRoPSIzLjQ2OTUwNzUiCiAgICAgICBoZWlnaHQ9IjkuNjE5OTk4IgogICAgICAgeD0iNTQuMDk5NDk1IgogICAgICAgeT0iOTUuNjQ4MDE4IiAvPjxyZWN0CiAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6Izc1NzU3NTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MC43NSIKICAgICAgIGlkPSJyZWN0MTcwNSIKICAgICAgIHdpZHRoPSIzLjMxMTgwMjkiCiAgICAgICBoZWlnaHQ9IjMuMzExODAyOSIKICAgICAgIHg9IjU0LjI1NzE4NyIKICAgICAgIHk9IjEwOC4wMjc4NSIgLz48cmVjdAogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNlMGUwZTA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjAuNzQwNjkiCiAgICAgICBpZD0icmVjdDIzMTEiCiAgICAgICB3aWR0aD0iMTUwLjExODc2IgogICAgICAgaGVpZ2h0PSIxNDkuNjkwOTkiCiAgICAgICB4PSItMTkuMDU2NDU4IgogICAgICAgeT0iMjguNDYxNzk2IiAvPjxnCiAgICAgICBpZD0iZzg1NiIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDMsMCwwLDMsLTExMS45ODQ1MywtMjA2LjY2NTY5KSI+PHBhdGgKICAgICAgICAgaWQ9InBhdGg5MTctNSIKICAgICAgICAgc3R5bGU9ImZpbGw6Izc1NzU3NTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MC43NSIKICAgICAgICAgZD0iTSA1NS45OTIyNyw4Ny45MjcwODIgQSAxNS42OTcxMDQsMTUuNDA2NDE3IDAgMCAwIDQwLjI5NDk5NiwxMDMuMzMyODUgMTUuNjk3MTA0LDE1LjQwNjQxNyAwIDAgMCA1NS45OTIyNywxMTguNzM4NjEgMTUuNjk3MTA0LDE1LjQwNjQxNyAwIDAgMCA3MS42ODk1MywxMDMuMzMyODUgMTUuNjk3MTA0LDE1LjQwNjQxNyAwIDAgMCA1NS45OTIyNyw4Ny45MjcwODIgWiBtIDAuMTA2OTMsMy4yMTY3OTcgQSAxMi4xMTE5NjMsMTIuNDAyNjUxIDAgMCAxIDY4LjIxMDUzLDEwMy41NDY3MSAxMi4xMTE5NjMsMTIuNDAyNjUxIDAgMCAxIDU2LjA5OTIsMTE1Ljk0OTU1IDEyLjExMTk2MywxMi40MDI2NTEgMCAwIDEgNDMuOTg3ODY4LDEwMy41NDY3MSAxMi4xMTE5NjMsMTIuNDAyNjUxIDAgMCAxIDU2LjA5OTIsOTEuMTQzODc5IFoiIC8+PHJlY3QKICAgICAgICAgc3R5bGU9ImZpbGw6Izc1NzU3NTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MC43NSIKICAgICAgICAgaWQ9InJlY3QxNzAzLTciCiAgICAgICAgIHdpZHRoPSIzLjQ2OTUwNzUiCiAgICAgICAgIGhlaWdodD0iOS42MTk5OTgiCiAgICAgICAgIHg9IjU0LjE4MTA5MSIKICAgICAgICAgeT0iOTUuNDcxNjAzIiAvPjxyZWN0CiAgICAgICAgIHN0eWxlPSJmaWxsOiM3NTc1NzU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjAuNzUiCiAgICAgICAgIGlkPSJyZWN0MTcwNS02IgogICAgICAgICB3aWR0aD0iMy4zMTE4MDI5IgogICAgICAgICBoZWlnaHQ9IjMuMzExODAyOSIKICAgICAgICAgeD0iNTQuMzM4NzgzIgogICAgICAgICB5PSIxMDcuODUxNDMiIC8+PC9nPjwvZz48L3N2Zz4K"
    };

    Imagine.epsilon = function(x1, x0) { return (x1-x0) < 1; }
    Imagine.reset = function(el = undefined) {

        var targetData = jQuery.data(el || document.documentElement);
        Object.keys(targetData).forEach((key) => delete targetData[key]);

        imageResponsiveList = [];

        return this;
    }

    Imagine.ready = function (options = {}) {

        if(options instanceof Event) options = {};

        if("debug" in options)
            Settings.debug = options["debug"];

        Imagine.configure(options);

        if (Settings.debug) console.log("Imagine is ready.");
        dispatchEvent(new Event('imagine:ready'));

        Imagine.preventLoading();
        return this;
    };

    Imagine.get = function(key) {

        if(key in Imagine.settings)
            return Imagine.settings[key];

        return null;
    };

    Imagine.set = function(key, value) {

        Imagine.settings[key] = value;
        return this;
    };

    Imagine.add = function(key, value) {

        if(! (key in Imagine.settings))
            Imagine.settings[key] = [];

        if (Imagine.settings[key].indexOf(value) === -1)
            Imagine.settings[key].push(value);

        return this;
    };

    Imagine.remove = function(key, value) {

        if(key in Imagine.settings) {

            Imagine.settings[key] = Imagine.settings[key].filter(function(setting, index, arr){
                return value != setting;
            });

            return Imagine.settings[key];
        }

        return null;
    };

    Imagine.configure = function (options)
    {
        var key, value;
        for (key in options) {
            value = options[key];
            if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
        }

        if (Settings.debug) console.log("Imagine configuration: ", Settings);

        return this;
    }

    Imagine.preventLoading = function()
    {
        if(Imagine.get("browser-level")) return;

        $("img[loading=lazy]").each(function() {

            var src = this.getAttribute("src"); // Keep the original path
            var lazyload = ($(this).attr("loading") == "lazy");

            if(src && lazyload) {

                if(Settings.debug) console.debug("Imagine prevents loading: ", this);
                this.setAttribute("data-src", src);
                this.removeAttribute("src");
                this.removeAttribute("loading");
            }
        });
    }

    Imagine.onLoad = function (el = undefined)
    {
        if(!el) el = document.documentElement;
        if(el instanceof Event) el = el.target;
        if(el == window) el = document.documentElement;
        if(el == document) el = document.documentElement;

        if(Imagine.get("disable") === true) {

            el.find("img.imagine").addClass("disabled");
            return;
        }

        Imagine.reset(el);
        Imagine.onSplit($(el).find("img.imagine"));

        Imagine.updateImageSet($(el).find("img[data-srcset]"));
        Imagine.loadImages($(el).find("img[data-src]"));
        Imagine.observeElement(el);

        return this;
    }

    Imagine.observeElement = function (el) {

        const observer = new MutationObserver(function(mutations_list) {
            mutations_list.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {

                    var lazyImages = $(node).find("img[data-src]");
                        lazyImages = Array.from(lazyImages).filter(i => i.dataset.src);
                        lazyImages.forEach(function (image) {
                            imageObserver.observe(image);
                        });
                });
            });
        });

        $(el).each(function () {
            observer.observe(this, { subtree: true, childList: true });
        })
    }

    Imagine.findImages = function (container) {

        if($(container).length == 0) return;

        const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;
        var arr = Array.from($(container)[0].querySelectorAll('*'));
            arr.push($(container)[0]);

        return arr.reduce((collection, node) => {

            let prop = window.getComputedStyle(node, null).getPropertyValue('background-image')
            let match = srcChecker.exec(prop);
            if (match) collection.add(match[1]);

            if (/^img$/i.test(node.tagName)) collection.add(node.src)
            else if (/^frame$/i.test(node.tagName)) {

                try {
                    searchDOM(node.contentDocument || node.contentWindow.document)
                        .forEach(img => { if (img) collection.add(img); })
                } catch (e) {}
            }

            return collection;

        }, new Set());
    }

    Imagine.eagerLoad = function(container = document.documentElement)
    {
        function loadImg (src) {
            return new Promise((resolve, reject) => {

                let img = new Image()
                    img.onload = () => {
                        resolve({
                            src: src,
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        })
                    }

                img.onerror = () => {
                    this.src = Assets.error;
                    reject();
                };
                img.src = src;
            });
        }

        function loadImgAll (imgList) {

            return new Promise((resolve, reject) => {
                Promise.all(imgList
                    .map(src => loadImg(src))
                    .map(p => p.catch(e => false))
                ).then(results => resolve(results.filter(r => r))
                ).catch(error => { reject(error); })
            })
        }

        return loadImgAll(
            Array.from(Imagine.findImages(container) ?? {})
        );
    }

    Imagine.onSplit = function(images = $("img.imagine")) {

        return Imagine.eagerLoad(images).then(function (metadata) {

            $(images).each(function(i)
            {
                gridX = parseInt($(this).data("x")) || 1;
                gridY = parseInt($(this).data("y")) || 1;

                var image = metadata[i];
                if(image == undefined) return;

                w = metadata[i].width;
                h = metadata[i].height;

                img = $(this).attr("src");
                delay = 0.0;

                var container = $("<div>").addClass("imagine");
                    container.insertBefore(this);

                container.addClass("active");
                for (x = 0; x < gridX; x++) {

                    for (y = 0; y < gridY; y++) {

                        var id = x+y*gridY+1;

                        var width  = w / gridX * 100 / w + "%" + (gridX-1 != x ? " + 1px" : ""),
                            height = h / gridY * 100 / h + "%" + (gridY-1 != y ? " + 1px" : ""),
                            top    = h / gridY * y * 100 / h + "%",
                            left   = w / gridX * x * 100 / w + "%",
                            bkgY   = gridY > 1 ? h / (gridY-1) * y * 100 / h + "%" : "100%",
                            bkgX   = gridX > 1 ? w / (gridX-1) * x * 100 / w + "%" : "100%";

                        $("<div />")
                            .addClass("imagine-item")
                            .addClass("imagine-item-"+id)
                            .addClass("zoom")
                            .css({
                            top   : "calc("+top+")",
                            left  : "calc("+left+")",
                            width : "calc("+width+")",
                            height: "calc("+height+")",
                            backgroundImage: "url(" + img + ")",
                            backgroundPosition: bkgX + " " + bkgY,
                            backgroundSize: gridX*100+"% "+gridY*100+"%",
                            transitionDelay: x * delay + y * delay + "s"
                        }).appendTo(container);
                    }
                }

                $(this).remove();

                $(this).on("click", function() { $(this).toggleClass("active"); });

                $(window).trigger("imagine");
            });
        });
    };

    var imageResponsiveList = [];
    Imagine.updateImageSet = function(images = [])
    {
        if(!Imagine.get("responsive")) return;

        function _payload(image) {

            const vw = Math.max(document.documentElement.clientWidth  || 0, window.innerWidth || 0);
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

            const w0 = Math.min(parseInt(window.getComputedStyle(image, null).getPropertyValue('width')) || vw, vw);
            const h0 = Math.min(parseInt(window.getComputedStyle(image, null).getPropertyValue('height')) || vh, vh);

            var candidates = [];

            var src = $(image).attr("src") ?? $(image).data("src");
                src = String(src).trim();

            // Include data-src into data-srcset..
            var assets = String($(image).data("srcset")).replace(/\s+/g, ' ').trim().split(",");
            if(!assets.includes(src)) {

                image.setAttribute("data-srcset", src + ", " + $(image).data("srcset"));
                assets = String($(image).data("srcset")).split(",");
            }

            assets.forEach(function (entry) {

                if(entry == "undefined" || !entry) return;
                var array = entry.trim().split(" ");

                var height = -1;
                var width  = -1;
                if(array.length > 1) {

                    if(array[1].endsWith("w")) width = parseInt(array[1]);
                    else height = parseInt(array[1])
                }

                if(array.length > 2) {

                    if(array[2].endsWith("w")) width = parseInt(array[2])
                    else height = parseInt(array[2])
                }

                candidates.push({"src": array[0], "width": width, "height": height});
            });

            var viewport = {"width": vw, "height": vh};
            function _sort(property) {

                return function (a,b) {

                    if(a[property] == b[property]) return 0;
                    var signA = (a[property] - viewport[property]) < 0 ? -1 : 1;
                    var signB = (b[property] - viewport[property]) < 0 ? -1 : 1;

                    if(signA  < 0 && signB >= 0) return  1;
                    if(signA >= 0 && signB  < 0) return -1;

                    return Math.abs(a[property] - viewport[property]) < Math.abs(b[property] - viewport[property]) ? -1 : 1;
                }
            }

            function _multisort() {

                var props = arguments;
                return function (obj1, obj2) {

                    var i = 0, result = 0, numberOfProperties = props.length;
                    while(result === 0 && i < numberOfProperties) {
                        result = _sort(props[i])(obj1, obj2);
                        i++;
                    }

                    return result;
                }
            }

            candidates.sort(vw/vh < 1 ? _multisort("height", "width") : _multisort("width", "height"));

            var bestCandidateSrc = candidates.length > 0 ? candidates[0].src : src;
            if (bestCandidateSrc)
                image.setAttribute("data-src", bestCandidateSrc);

            return image;
        }

        // Synchronized loading
        $(images).each(function() { _payload(this); } );

        // Update on viewport resize
        window.addEventListener("resize", function() {
            $(imageResponsiveList).each(function() { _payload(this); });
            Imagine.loadImages(imageResponsiveList);
        });
        window.addEventListener("resize", function() {
            $(imageResponsiveList).each(function() { _payload(this); });
            Imagine.loadImages(imageResponsiveList);
        });
        window.addEventListener("orientationChange", function() {
            $(imageResponsiveList).each(function() { _payload(this); });
            Imagine.loadImages(imageResponsiveList);
        });
    }

    Imagine.largestImageLoaded = function(image)
    {
        var dataset = $(image).data("srcset");
        if(!dataset) return true;

        var src = $(image).attr("src") ?? $(image).data("src");
            src = String(src).trim();

        // Include data-src into data-srcset..
        var assets = String($(image).data("srcset")).replace(/\s+/g, ' ').trim().split(",");
        if(assets.findIndex((asset) => { return asset.trim().startsWith(src); }, src) < 0)
        {
            image.setAttribute("data-srcset", src + ", " + $(image).data("srcset"));
            assets = String($(image).data("srcset")).split(",");
        }

        var candidates = [];
        assets.forEach(function (entry) {

            if(entry == "undefined" || !entry) return;
            var array = entry.trim().split(" ");

            var height = -1;
            var width  = -1;
            if(array.length > 1) {

                if(array[1].endsWith("w")) width = parseInt(array[1]);
                else height = parseInt(array[1])
            }

            if(array.length > 2) {

                if(array[2].endsWith("w")) width = parseInt(array[2])
                else height = parseInt(array[2])
            }

            candidates.push({"src": array[0], "width": width, "height": height});
            candidates.sort(function(a, b) {

                if( (a.width  < 0)        && !(b.width < 0)         ) return  1;
                if(!(a.width  < 0)        &&  (b.width < 0)         ) return -1;
                if(a.width  == b.width) {

                    if(a.height == b.height) return 0;
                    if( (a.height  < 0)        && !(b.height < 0)         ) return  1;
                    if(!(a.height  < 0)        &&  (b.height < 0)         ) return -1;
                }

                var w = a.width  > 0 && b.width  > 0 ? Math.abs(a.width ) - Math.abs(b.width ) : 0;
                var h = a.height > 0 && b.height > 0 ? Math.abs(a.height) - Math.abs(b.height) : 0;
                return w == 0 ? h : w;
            });
        });

        if(!candidates.length) return true;
        return candidates[candidates.length - 1].src == src;
    }

    var imageObserver = null;
    var lazyObserver = null;
    var imageResponsiveList = [];
    Imagine.loadImages = function (images = [])
    {
        if(Imagine.get("lazyload")) {

            lazyObserver = lazyObserver ?? new MutationObserver((changes) => {
                changes.forEach(change => {

                    if(change.attributeName.includes('data-src'))
                        change.target.src = change.target.dataset.src; // @todo: check if responsive `srcset` list
                });
            });

            var lazyImages = images;
            if(!lazyImages.length) lazyImages = document.querySelectorAll("img[data-src]:not(.loaded)");

            lazyImages = Array.from(lazyImages).filter(i => i.dataset.src);

            if ("IntersectionObserver" in window) {

                let options = { root:null, rootMargin: Imagine.get("threshold") };
                imageObserver = imageObserver ?? new IntersectionObserver(function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting && !entry.target.classList.contains("loaded")) {

                            var image = entry.target;
                            var lazybox = image.closest(".lazybox");

                            image.onload = function() {

                                this.classList.add("loaded");
                                this.classList.remove("loading");

                                if(lazybox) lazybox.classList.add("loaded");
                                if(lazybox) lazybox.classList.remove("loading");

                                window.dispatchEvent(new CustomEvent('imagine:new', {detail:image}));
                                lazyObserver.observe(image, {attributes : true});
                            };

                            image.onerror = function() {

                                image.src = Assets.error;

                                this.classList.add("loaded");
                                this.classList.remove("loading");

                                if(lazybox) lazybox.classList.add("loaded");
                                if(lazybox) lazybox.classList.remove("loading");

                                window.dispatchEvent(new CustomEvent('imagine:new', {detail:image}));
                                lazyObserver.observe(image, {attributes : true});
                            };
            
                            if(lazybox) lazybox.classList.add("loading");
                            image.classList.add("loading");
                            image.src = image.dataset.src;

                            imageObserver.unobserve(image);

                            var index = imageResponsiveList.indexOf(image);
                            if (index !== -1 && Imagine.largestImageLoaded(image))
                                imageResponsiveList.splice(index, 1);
                        }
                    });

                }, options);

                lazyImages.forEach(function (image) {
                    imageObserver.observe(image);
                });

            } else {

                var lazyloadThrottleTimeout;

                function lazyload() {

                    if (lazyloadThrottleTimeout) {
                        clearTimeout(lazyloadThrottleTimeout);
                    }

                    lazyloadThrottleTimeout = setTimeout(function () {

                        var scrollTop = window.pageYOffset;
                        images.forEach(function (img) {
                            if (img.offsetTop < (window.innerHeight + scrollTop)) {

                                if (image.dataset.src && image.dataset.src != "undefined")
                                    image.src = image.dataset.src;

                                img.classList.add('loaded');
                            }

                            if (Imagine.largestImageLoaded(img)) {
                                var index = imageResponsiveList.indexOf(img);
                                if (index !== -1) imageResponsiveList.splice(index, 1);
                            }
                        });

                        if (images.length == 0) {
                            document.removeEventListener("scroll", lazyload);
                            window.removeEventListener("resize", lazyload);
                            window.removeEventListener("orientationChange", lazyload);
                        }

                    }, 20);
                }

                document.addEventListener("scroll", lazyload);
                window.addEventListener("orientationChange", lazyload);
            }
        }

        $("img[data-src]").each(function() {
            lazyObserver.observe(this, {attributes : true});
        })

        $("img[data-srcset]").each(function() {

            if (!Imagine.largestImageLoaded(this))
                imageResponsiveList.push(this);

            $(this).attr("src", this.dataset.src);
        });
    }

    //
    // Event handling (w/ priority)
    Imagine.preventLoading(); // Prevent loading lazyload pictures very early
    window.addEventListener("onbeforeunload", Imagine.reset, true);
    window.addEventListener("DOMContentLoaded", Imagine.ready);
    window.addEventListener("load", Imagine.onLoad, false);

    //
    // LCP Metric
    if ("IntersectionObserver" in window) {

        new PerformanceObserver((list) => {

            const latestEntry = list.getEntries().at(-1);
            if (latestEntry?.element?.getAttribute('loading') == 'lazy' || latestEntry?.element?.getAttribute("data-src")) {
                console.warn('Warning: LCP element was lazy loaded', latestEntry);
            }

        }).observe({type: 'largest-contentful-paint', buffered: true});
    }

    return Imagine;
});
