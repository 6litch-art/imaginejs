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

        "debug"           : true,
        "disable"         : false,
        "responsive"      : true,

        "lazyload"        : true,
        "browser-level"   : false, // Prevent lazy loading at browser-level
        "threshold"       : "25%"
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

    Imagine.configure = function (options) {

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

        return this;
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

                img.onerror = reject;
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

                $(window).trigger("load.imagine");
            });
        });
    };

    var imageResponsiveList = [];
    Imagine.updateImageSet = function(images = [])
    {
        if(!Imagine.get("responsive")) return;

        function _payload(image) {

            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

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

                var maxHeight = -1;
                var maxWidth  = -1;
                if(array.length > 1) {

                    if(array[1].endsWith("w")) maxWidth = parseInt(array[1]);
                    else maxHeight = parseInt(array[1])
                }

                if(array.length > 2) {

                    if(array[2].endsWith("w")) maxWidth = parseInt(array[2])
                    else maxHeight = parseInt(array[2])
                }

                candidates.push({"src": array[0], "maxWidth": maxWidth, "maxHeight": maxHeight});
            });

            candidates.sort(function(a, b) {

                if( (a.maxWidth  < 0)        && !(b.maxWidth < 0)         ) return  1;
                if(!(a.maxWidth  < 0)        &&  (b.maxWidth < 0)         ) return -1;
                if(a.maxWidth  == b.maxWidth) {

                    if(a.maxHeight == b.maxHeight) return 0;
                    if( (a.maxHeight  < 0)        && !(b.maxHeight < 0)         ) return  1;
                    if(!(a.maxHeight  < 0)        &&  (b.maxHeight < 0)         ) return -1;
                }

                var w = a.maxWidth  > 0 && b.maxWidth  > 0 ? Math.abs(a.maxWidth  - vw) - Math.abs(b.maxWidth  - vw) : 0;
                var h = a.maxHeight > 0 && b.maxHeight > 0 ? Math.abs(a.maxHeight - vh) - Math.abs(b.maxHeight - vh) : 0;
                return w == 0 ? h : w;
            });

            var bestCandidateSrc = candidates[0].src ?? src;
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
        window.addEventListener("orientationChange", function() {
            $(imageResponsiveList).each(function() { _payload(this); });
            Imagine.loadImages(imageResponsiveList);
        });
    }

    Imagine.largestImageLoaded = function(image)
    {
        var dataset = $(image).data("srcset");
        if(!dataset) return true;

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

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

            var maxHeight = -1;
            var maxWidth  = -1;
            if(array.length > 1) {

                if(array[1].endsWith("w")) maxWidth = parseInt(array[1]);
                else maxHeight = parseInt(array[1])
            }

            if(array.length > 2) {

                if(array[2].endsWith("w")) maxWidth = parseInt(array[2])
                else maxHeight = parseInt(array[2])
            }

            candidates.push({"src": array[0], "maxWidth": maxWidth, "maxHeight": maxHeight});
            candidates.sort(function(a, b) {

                if( (a.maxWidth  < 0)        && !(b.maxWidth < 0)         ) return  1;
                if(!(a.maxWidth  < 0)        &&  (b.maxWidth < 0)         ) return -1;
                if(a.maxWidth  == b.maxWidth) {

                    if(a.maxHeight == b.maxHeight) return 0;
                    if( (a.maxHeight  < 0)        && !(b.maxHeight < 0)         ) return  1;
                    if(!(a.maxHeight  < 0)        &&  (b.maxHeight < 0)         ) return -1;
                }

                var w = a.maxWidth  > 0 && b.maxWidth  > 0 ? Math.abs(a.maxWidth ) - Math.abs(b.maxWidth ) : 0;
                var h = a.maxHeight > 0 && b.maxHeight > 0 ? Math.abs(a.maxHeight) - Math.abs(b.maxHeight) : 0;
                return w == 0 ? h : w;
            });
        });

        if(!candidates.length) return true;
        return candidates[candidates.length - 1].src == src;
    }

    var imageResponsiveList = [];
    Imagine.loadImages = function (images = [])
    {
        if(Imagine.get("lazyload")) {

            var lazyImages = images;
            if(!lazyImages.length) lazyImages = document.querySelectorAll("img[data-src]:not(.loaded)");

            lazyImages = Array.from(lazyImages).filter(i => i.dataset.src);
            if ("IntersectionObserver" in window) {

                let options = { root:null, rootMargin: Imagine.get("threshold") };
                var imageObserver = new IntersectionObserver(function (entries, observer) {

                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {

                            var image = entry.target;
                            var lazybox = image.closest(".lazybox");

                            image.onload = function() {
                                this.classList.add("loaded");
                                this.classList.remove("loading");
                                if(lazybox) lazybox.classList.add("loaded");
                                if(lazybox) lazybox.classList.remove("loading");
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
                                img.src = img.dataset.src;
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

        $("img[data-srcset]").each(function() {

            if (!Imagine.largestImageLoaded(this))
                imageResponsiveList.push(this);

            if (this.dataset.src)
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
