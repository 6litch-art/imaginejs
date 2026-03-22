$.fn.serializeObject = function () {

    const o = {};
    const a = this.serializeArray();
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

    const Imagine = {};
          Imagine.version = '0.1.0';

    const Settings = Imagine.settings = {

        "debug"           : false,
        "disable"         : false,
        "responsive"      : true,

        "lazyload"        : true,
        "browser-level"   : false, // Prevent lazy loading at browser-level
        "threshold"       : "25%"
    };

    const Assets = Imagine.assets = {
        "error": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgdmVyc2lvbj0iMS4wIgogICB3aWR0aD0iMTUwLjExODc3cHQiCiAgIGhlaWdodD0iMTQ5LjY5MDk4cHQiCiAgIHZpZXdCb3g9IjAgMCAxNTAuMTE4NzcgMTQ5LjY5MDk4IgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIKICAgaWQ9InN2ZzEwIgogICBzb2RpcG9kaTpkb2NuYW1lPSJpbWFnZS1lcnJvci5zdmciCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlua3NjYXBlOmV4cG9ydC1maWxlbmFtZT0iZXJyb3ItaW1hZ2UtZ2VuZXJpYy5zdmciCiAgIGlua3NjYXBlOmV4cG9ydC14ZHBpPSI5NiIKICAgaW5rc2NhcGU6ZXhwb3J0LXlkcGk9Ijk2IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjIuMiAoYjBhODQ4NjUsIDIwMjItMTItMDEpIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzCiAgICAgaWQ9ImRlZnMxNCIgLz48c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9Im5hbWVkdmlldzEyIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgICBib3JkZXJvcGFjaXR5PSIwLjI1IgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiNkMWQxZDEiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB0IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjkxNjA2ODU5IgogICAgIGlua3NjYXBlOmN4PSIzMS4xMTEyMDgiCiAgICAgaW5rc2NhcGU6Y3k9IjExNi44MDM0OCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEzMDkiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNDU2IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIzOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImcyNDI4IiAvPjxnCiAgICAgaWQ9ImcyNDI4IgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5LjA1NjQ1NywtMjguNDYxNzk3KSI+PGcKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuMSwwLDAsLTAuMSwtNDUsMjAwKSIKICAgICAgIGZpbGw9IiMwMDAwMDAiCiAgICAgICBzdHJva2U9Im5vbmUiCiAgICAgICBpZD0iZzgiPjxwYXRoCiAgICAgICAgIGQ9Im0gOTc1LDExOTUgYyAtNSwtMiAtMjIsLTYgLTM4LC05IC00OCwtMTEgLTEwNSwtNzIgLTEyMywtMTMyIC0xNCwtNDkgLTE0LC01OSAwLC0xMDggMTEsLTM4IDI3LC02NCA1NCwtODggMTA5LC05OCAyNzcsLTUxIDMxOCw4OSAxNCw0OCAxNCw1OCAwLDEwNiAtMTksNjUgLTY2LDExMyAtMTMxLDEzMyAtNDgsMTQgLTYxLDE1IC04MCw5IHogbSAxMjIsLTYzIGMgNjYsLTQ3IDgzLC0xNjIgMzUsLTIyOSAtNDcsLTY2IC0xNjIsLTgzIC0yMjksLTM1IC05Miw2NSAtODAsMjI1IDE5LDI3NiA0NiwyMyAxMzQsMTcgMTc1LC0xMiB6IgogICAgICAgICBpZD0icGF0aDIiIC8+PHBhdGgKICAgICAgICAgZD0ibSA5ODAsMTA0MCBjIDAsLTUzIDIsLTYwIDIwLC02MCAxOCwwIDIwLDcgMjAsNjAgMCw1MyAtMiw2MCAtMjAsNjAgLTE4LDAgLTIwLC03IC0yMCwtNjAgeiIKICAgICAgICAgaWQ9InBhdGg0IiAvPjxwYXRoCiAgICAgICAgIGQ9Im0gOTgwLDkyMCBjIDAsLTEzIDcsLTIwIDIwLC0yMCAxMywwIDIwLDcgMjAsMjAgMCwxMyAtNywyMCAtMjAsMjAgLTEzLDAgLTIwLC03IC0yMCwtMjAgeiIKICAgICAgICAgaWQ9InBhdGg2IiAvPjwvZz48cGF0aAogICAgICAgaWQ9InBhdGg5MTciCiAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6Izc1NzU3NTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MC43NSIKICAgICAgIGQ9Ik0gNTUuOTEwNjcsODguMTAzNDk2IEEgMTUuNjk3MTA0LDE1LjQwNjQxNyAwIDAgMCA0MC4yMTMzOTksMTAzLjUwOTI2IDE1LjY5NzEwNCwxNS40MDY0MTcgMCAwIDAgNTUuOTEwNjcsMTE4LjkxNTAyIDE1LjY5NzEwNCwxNS40MDY0MTcgMCAwIDAgNzEuNjA3OTMsMTAzLjUwOTI2IDE1LjY5NzEwNCwxNS40MDY0MTcgMCAwIDAgNTUuOTEwNjcsODguMTAzNDk2IFogbSAwLjEwNjkzLDMuMjE2Nzk3IEEgMTIuMTExOTYzLDEyLjQwMjY1MSAwIDAgMSA2OC4xMjg5MywxMDMuNzIzMTIgMTIuMTExOTYzLDEyLjQwMjY1MSAwIDAgMSA1Ni4wMTc2LDExNi4xMjU5NiAxMi4xMTkzLDEyLjQwMjY1MSAwIDAgMSA0My45MDYyNzEsMTAzLjcyMzEyIDEyLjExMTk2MywxMi40MDI2NTEgMCAwIDEgNTYuMDE3Niw5MS4zMjAyOTMgWiIgLz48cmVjdAogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM3NTc1NzU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjAuNzUiCiAgICAgICBpZD0icmVjdDE3MDMiCiAgICAgICB3aWR0aD0iMy40Njk1MDc1IgogICAgICAgaGVpZ2h0PSI5LjYxOTk5OCIKICAgICAgIHg9IjU0LjA5OTQ5NSIKICAgICAgIHk9Ijk1LjY0ODAxOCIgLz48cmVjdAogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM3NTc1NzU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjAuNzUiCiAgICAgICBpZD0icmVjdDE3MDUiCiAgICAgICB3aWR0aD0iMy4zMTE4MDI5IgogICAgICAgaGVpZ2h0PSIzLjMxMTgwMjkiCiAgICAgICB4PSI1NC4yNTcxODciCiAgICAgICB5PSIxMDguMDI3ODUiIC8+PHJlY3QKICAgICAgIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZTBlMGUwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDowLjc0MDY5IgogICAgICAgaWQ9InJlY3QyMzExIgogICAgICAgd2lkdGg9IjE1MC4xMTg3NiIKICAgICAgIGhlaWdodD0iMTQ5LjY5MDk5IgogICAgICAgeD0iLTE5LjA1NjQ1OCIKICAgICAgIHk9IjI4LjQ2MTc5NiIgLz48ZwogICAgICAgaWQ9Imc4NTYiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgzLDAsMCwzLC0xMTEuOTg0NTMsLTIwNi42NjU2OSkiPjxwYXRoCiAgICAgICAgIGlkPSJwYXRoOTE3LTUiCiAgICAgICAgIHN0eWxlPSJmaWxsOiM3NTc1NzU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjAuNzUiCiAgICAgICAgIGQ9Ik0gNTUuOTkyMjcsODcuOTI3MDgyIEEgMTUuNjk3MTA0LDE1LjQwNjQxNyAwIDAgMCA0MC4yOTQ5OTYsMTAzLjMzMjg1IDE1LjY5NzEwNCwxNS40MDY0MTcgMCAwIDAgNTUuOTkyMjcsMTE4LjczODYxIDE1LjY5NzEwNCwxNS40MDY0MTcgMCAwIDAgNzEuNjg5NTMsMTAzLjMzMjg1IDE1LjY5NzEwNCwxNS40MDY0MTcgMCAwIDAgNTUuOTkyMjcsODcuOTI3MDgyIFogbSAwLjEwNjkzLDMuMjE2Nzk3IEEgMTIuMTExOTYzLDEyLjQwMjY1MSAwIDAgMSA2OC4yMTA1MywxMDMuNTQ2NzEgMTIuMTExOTYzLDEyLjQwMjY1MSAwIDAgMSA1Ni4wOTkyLDExNS45NDk1NSAxMi4xMTE5NjMsMTIuNDAyNjUxIDAgMCAxIDQzLjk4Nzg2OCwxMDMuNTQ2NzEgMTIuMTExOTYzLDEyLjQwMjY1MSAwIDAgMSA1Ni4wOTkyLDkxLjE0Mzg3OSBaIiAvPjxyZWN0CiAgICAgICAgIHN0eWxlPSJmaWxsOiM3NTc1NzU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjAuNzUiCiAgICAgICAgIGlkPSJyZWN0MTcwMy03IgogICAgICAgICB3aWR0aD0iMy40Njk1MDc1IgogICAgICAgICBoZWlnaHQ9IjkuNjE5OTk4IgogICAgICAgICB4PSI1NC4xODEwOTEiCiAgICAgICAgIHk9Ijk1LjQ3MTYwMyIgLz48cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojNzU3NTc1O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDowLjc1IgogICAgICAgICBpZD0icmVjdDE3MDUtNiIKICAgICAgICAgd2lkdGg9IjMuMzExODAyOSIKICAgICAgICAgaGVpZ2h0PSIzLjMxMTgwMjkiCiAgICAgICAgIHg9IjU0LjMzODc4MyIKICAgICAgICAgeT0iMTA3Ljg1MTQzIiAvPjwvZz48L2c+PC9zdmc+Cg=="
    };

    Imagine.epsilon = function(x1, x0) { return (x1-x0) < 1; }
    Imagine.reset = function(el = undefined) {

        const targetData = jQuery.data(el || document.documentElement);
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

            Imagine.settings[key] = Imagine.settings[key].filter(function(setting) {
                return value !== setting;
            });

            return Imagine.settings[key];
        }

        return null;
    };

    Imagine.configure = function (options)
    {
        let key, value;
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

            const src = this.getAttribute("src"); // Keep the original path
            const lazyload = ($(this).attr("loading") === "lazy");

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
        if(el === window) el = document.documentElement;
        if(el === document) el = document.documentElement;

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

                    let lazyImages = $(node).find("img[data-src]");
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

        if($(container).length === 0) return;

        const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;
        const arr = Array.from($(container)[0].querySelectorAll('*'));
              arr.push($(container)[0]);

        return arr.reduce((collection, node) => {

            const prop = window.getComputedStyle(node, null).getPropertyValue('background-image');
            const match = srcChecker.exec(prop);
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

                const img = new Image();
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
                    .map(p => p.catch(() => false))
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
                const gridX = parseInt($(this).data("x")) || 1;
                const gridY = parseInt($(this).data("y")) || 1;

                const image = metadata[i];
                if(image === undefined) return;

                const w = metadata[i].width;
                const h = metadata[i].height;

                const img = $(this).attr("src");
                const delay = 0.0;

                const container = $("<div>").addClass("imagine");
                      container.insertBefore(this);

                container.addClass("active");
                for (let x = 0; x < gridX; x++) {

                    for (let y = 0; y < gridY; y++) {

                        const id = x+y*gridY+1;

                        const width  = w / gridX * 100 / w + "%" + (gridX-1 !== x ? " + 1px" : ""),
                              height = h / gridY * 100 / h + "%" + (gridY-1 !== y ? " + 1px" : ""),
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

    let imageResponsiveList = [];
    Imagine.updateImageSet = function(images = [])
    {
        if(!Imagine.get("responsive")) return;

        function _payload(image) {

            const vw = Math.max(document.documentElement.clientWidth  || 0, window.innerWidth || 0);
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

            const w0 = Math.min(parseInt(window.getComputedStyle(image, null).getPropertyValue('width')) || vw, vw);
            const h0 = Math.min(parseInt(window.getComputedStyle(image, null).getPropertyValue('height')) || vh, vh);

            const candidates = [];

            let src = $(image).attr("src") ?? $(image).data("src");
                src = String(src).trim();

            // Include data-src into data-srcset..
            let assets = String($(image).data("srcset")).replace(/\s+/g, ' ').trim().split(",");
            if(!assets.includes(src)) {

                image.setAttribute("data-srcset", src + ", " + $(image).data("srcset"));
                assets = String($(image).data("srcset")).split(",");
            }

            assets.forEach(function (entry) {

                if(entry === "undefined" || !entry) return;
                const array = entry.trim().split(" ");

                let height = -1;
                let width  = -1;
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

            const viewport = {"width": vw, "height": vh};
            function _sort(property) {

                return function (a,b) {

                    if(a[property] === b[property]) return 0;
                    const signA = (a[property] - viewport[property]) < 0 ? -1 : 1;
                    const signB = (b[property] - viewport[property]) < 0 ? -1 : 1;

                    if(signA  < 0 && signB >= 0) return  1;
                    if(signA >= 0 && signB  < 0) return -1;

                    return Math.abs(a[property] - viewport[property]) < Math.abs(b[property] - viewport[property]) ? -1 : 1;
                }
            }

            function _multisort() {

                const props = arguments;
                return function (obj1, obj2) {

                    let i = 0, result = 0;
                    const numberOfProperties = props.length;
                    while(result === 0 && i < numberOfProperties) {
                        result = _sort(props[i])(obj1, obj2);
                        i++;
                    }

                    return result;
                }
            }

            candidates.sort(vw/vh < 1 ? _multisort("height", "width") : _multisort("width", "height"));

            const bestCandidateSrc = candidates.length > 0 ? candidates[0].src : src;
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
        window.addEventListener("orientationchange", function() {
            $(imageResponsiveList).each(function() { _payload(this); });
            Imagine.loadImages(imageResponsiveList);
        });
    }

    Imagine.largestImageLoaded = function(image)
    {
        const dataset = $(image).data("srcset");
        if(!dataset) return true;

        let src = $(image).attr("src") ?? $(image).data("src");
            src = String(src).trim();

        // Include data-src into data-srcset..
        let assets = String($(image).data("srcset")).replace(/\s+/g, ' ').trim().split(",");
        if(assets.findIndex((asset) => { return asset.trim().startsWith(src); }, src) < 0)
        {
            image.setAttribute("data-srcset", src + ", " + $(image).data("srcset"));
            assets = String($(image).data("srcset")).split(",");
        }

        const candidates = [];
        assets.forEach(function (entry) {

            if(entry === "undefined" || !entry) return;
            const array = entry.trim().split(" ");

            let height = -1;
            let width  = -1;
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
                if(a.width  === b.width) {

                    if(a.height === b.height) return 0;
                    if( (a.height  < 0)        && !(b.height < 0)         ) return  1;
                    if(!(a.height  < 0)        &&  (b.height < 0)         ) return -1;
                }

                const w = a.width  > 0 && b.width  > 0 ? Math.abs(a.width ) - Math.abs(b.width ) : 0;
                const h = a.height > 0 && b.height > 0 ? Math.abs(a.height) - Math.abs(b.height) : 0;
                return w === 0 ? h : w;
            });
        });

        if(!candidates.length) return true;
        return candidates[candidates.length - 1].src === src;
    }

    let imageObserver = null;
    let lazyObserver = null;
    Imagine.loadImages = function (images = [])
    {
        if(Imagine.get("lazyload")) {

            lazyObserver = lazyObserver ?? new MutationObserver((changes) => {
                changes.forEach(change => {

                    if(change.attributeName.includes('data-src'))
                        change.target.src = change.target.dataset.src; // @todo: check if responsive `srcset` list
                });
            });

            let lazyImages = images;
            if(!lazyImages.length) lazyImages = document.querySelectorAll("img[data-src]:not(.loaded)");

            lazyImages = Array.from(lazyImages).filter(i => i.dataset.src);

            if ("IntersectionObserver" in window) {

                const options = { root:null, rootMargin: Imagine.get("threshold") };
                imageObserver = imageObserver ?? new IntersectionObserver(function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting && !entry.target.classList.contains("loaded")) {

                            const image = entry.target;
                            const lazybox = image.closest(".lazybox");

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

                            const index = imageResponsiveList.indexOf(image);
                            if (index !== -1 && Imagine.largestImageLoaded(image))
                                imageResponsiveList.splice(index, 1);
                        }
                    });

                }, options);

                lazyImages.forEach(function (image) {
                    imageObserver.observe(image);
                });

            } else {

                let lazyloadThrottleTimeout;

                function lazyload() {

                    if (lazyloadThrottleTimeout) {
                        clearTimeout(lazyloadThrottleTimeout);
                    }

                    lazyloadThrottleTimeout = setTimeout(function () {

                        const scrollTop = window.pageYOffset;
                        images.forEach(function (img) {
                            if (img.offsetTop < (window.innerHeight + scrollTop)) {

                                if (img.dataset.src && img.dataset.src !== "undefined")
                                    img.src = img.dataset.src;

                                img.classList.add('loaded');
                            }

                            if (Imagine.largestImageLoaded(img)) {
                                const index = imageResponsiveList.indexOf(img);
                                if (index !== -1) imageResponsiveList.splice(index, 1);
                            }
                        });

                        if (images.length === 0) {
                            document.removeEventListener("scroll", lazyload);
                            window.removeEventListener("resize", lazyload);
                            window.removeEventListener("orientationchange", lazyload);
                        }

                    }, 20);
                }

                document.addEventListener("scroll", lazyload);
                window.addEventListener("orientationchange", lazyload);
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
    window.addEventListener("beforeunload", Imagine.reset, true);
    window.addEventListener("DOMContentLoaded", Imagine.ready);
    window.addEventListener("load", Imagine.onLoad, false);

    //
    // LCP Metric
    if ("IntersectionObserver" in window) {

        new PerformanceObserver((list) => {

            const latestEntry = list.getEntries().at(-1);
            if (latestEntry?.element?.getAttribute('loading') === 'lazy' || latestEntry?.element?.getAttribute("data-src")) {
                console.warn('Warning: LCP element was lazy loaded', latestEntry);
            }

        }).observe({type: 'largest-contentful-paint', buffered: true});
    }

    return Imagine;
});
