(function (interact) {

    'use strict';

    var transformProp;
    var z = 10;

    interact.maxInteractions(Infinity);

    // setup draggable elements.
    interact('.js-drag')
        .draggable({ max: Infinity })
        .on('dragstart', function (event) {
            event.interaction.x = parseInt(event.target.getAttribute('data-x'), 10) || 0;
            event.interaction.y = parseInt(event.target.getAttribute('data-y'), 10) || 0;
            // Initialize the width
            event.interaction.width = event.target.offsetWidth;
            // Increment zIndex so most recently touched picture is on top
            z++;
            event.target.style.zIndex = z;

        })
        .on('dragmove', function (event) {
            event.interaction.x += event.dx;
            event.interaction.y += event.dy;
            
            console.log('dimensions',event.target.offsetWidth,event.target.offsetHeight);
            console.log('mouse',event.clientX,event.clientY);
            console.log('picture',event.interaction.x,event.interaction.y);
            console.log('difference',event.interaction.width,event.target.offsetWidth);
            if (event.interaction.width != event.target.offsetWidth) {
                // Keep the cursor in the center of the picture when it gets smaller
                event.interaction.x = (event.clientX - (event.dx + (event.target.offsetWidth/2)));
                event.interaction.y = (event.clientY - (event.dy + (event.target.offsetHeight/2)));
            }

            // event.target.style.left
            // event.target.style.top

            if (transformProp) {
                event.target.style[transformProp] =
                    'translate(' + event.interaction.x + 'px, ' + event.interaction.y + 'px)';
            }
            else {
                event.target.style.left = event.interaction.x + 'px';
                event.target.style.top  = event.interaction.y + 'px';
            }
        })
        .on('dragend', function (event) {
            event.target.setAttribute('data-x', event.interaction.x);
            event.target.setAttribute('data-y', event.interaction.y);            
        });

    // setup drop areas.
    setupDropzone('.js-drop', '.js-drag');

    /**
     * Setup a given element as a dropzone.
     *
     * @param {HTMLElement|String} el
     * @param {String} accept
     */
    function setupDropzone(el, accept) {
        interact(el)
            .dropzone({
                accept: accept,
                ondropactivate: function (event) {
                    addClass(event.relatedTarget, '-drop-possible');
                },
                ondropdeactivate: function (event) {
                    removeClass(event.relatedTarget, '-drop-possible');
                }
            })
            .on('dropactivate', function (event) {
                var active = event.target.getAttribute('active')|0;

                // change style if it was previously not active
                if (active === 0) {
                    addClass(event.target, '-drop-possible');
                    // event.target.textContent = 'Drop me here!';
                }

                event.target.setAttribute('active', active + 1);
            })
            .on('dropdeactivate', function (event) {
                var active = event.target.getAttribute('active')|0;
                // change style if it was previously active
                // but will no longer be active
                if (active === 1) {
                    removeClass(event.target, '-drop-possible');
                    // event.target.textContent = 'Dropzone';
                }

                event.target.setAttribute('active', active - 1);
            })
            .on('dragenter', function (event) {
                addClass(event.target, '-drop-over');
                addClass(event.relatedTarget, 'drop-success');
                // event.relatedTarget.textContent = 'I\'m in';
            })
            .on('dragleave', function (event) {
                removeClass(event.target, '-drop-over');
                removeClass(event.relatedTarget, 'drop-success');
                // event.relatedTarget.textContent = 'Drag me…';
            })
            .on('drop', function (event) {
                removeClass(event.target, '-drop-over');
                // event.relatedTarget.textContent = 'Dropped';
            });
    }

    function addClass (element, className) {
        if (element.classList) {
            return element.classList.add(className);
        }
        else {
            element.className += ' ' + className;
        }
    }

    function removeClass (element, className) {
        if (element.classList) {
            return element.classList.remove(className);
        }
        else {
            element.className = element.className.replace(new RegExp(className + ' *', 'g'), '');
        }
    }

    interact(document).on('ready', function () {
        transformProp = 'transform' in document.body.style
            ? 'transform': 'webkitTransform' in document.body.style
            ? 'webkitTransform': 'mozTransform' in document.body.style
            ? 'mozTransform': 'oTransform' in document.body.style
            ? 'oTransform': 'msTransform' in document.body.style
            ? 'msTransform': null;
    });

}(window.interact));