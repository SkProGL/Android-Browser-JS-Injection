javascript: (function () {
    /*NOTE: all newlines should be removed and every line(those that require semicolon by default) should have semicolon at the end.
    don't use // for comments because it heavily depends on newlines, therefore when inject use multiline comments*/

    let [movableDiv, menu, input_time, input_speed, btn_backward, btn_forward, btn_lock] = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button')
    ];
    var offset = [0, 0], isDown = false, fixed = false;

    function rewind(forward = false, time = 30) {
        let v = document.querySelector('video'),
            t = document.getElementById('inject_time');
        if (t.value > 0) {
            time = parseFloat(t.value);
        } v.currentTime = (forward) ? v.currentTime + parseFloat(time) : v.currentTime - parseFloat(time);
    }
    function playback_speed(speed = 1) {
        let v = document.querySelector('video');
        v.playbackRate = (speed > 0) ? parseFloat(speed) : 1;
    }
    function createDiv() {
        menu.position = 'absolute';
        menu.border = 'none';
        menu.style.width = '100%';
        menu.style.height = '9%';
        menu.zIndex = '9999';

        input_time.id = 'inject_time';
        input_time.value = '30';
        input_time.style.width = '20%';
        input_time.placeholder = 'rewind';

        input_speed.id = 'inject_speed';
        input_speed.value = '1';
        input_speed.style.width = '15%';
        input_speed.placeholder = 'rate';

        btn_backward.id = 'inject_rewind_backward';
        btn_backward.innerText = '<';
        btn_backward.style.width = '30%';

        btn_forward.id = 'inject_rewind_forward';
        btn_forward.innerText = '>';
        btn_forward.style.width = '30%';

        btn_lock.innerText = 'movable';
        btn_lock.id = 'inject_lock';

        movableDiv.style.position = "relative";
        movableDiv.style.zIndex = '9999';
        movableDiv.style.left = "0px";
        movableDiv.style.top = "0px";
        movableDiv.style.width = "50%";
        movableDiv.style.height = "20%";
        movableDiv.style.background = "rgba(33, 33, 33, 0.98)";
        movableDiv.style.border = '0.3rem solid #fff';

        menu.appendChild(btn_backward.cloneNode(true));
        menu.appendChild(input_time.cloneNode(true));
        menu.appendChild(btn_forward.cloneNode(true));
        menu.appendChild(input_speed.cloneNode(true));
        menu.appendChild(btn_lock);
        movableDiv.appendChild(menu);
    }
    createDiv();
    document.getElementsByTagName('body')[0].prepend(movableDiv);
    navigator.mediaSession.setActionHandler('nexttrack', () => { rewind(true) });
    navigator.mediaSession.setActionHandler('previoustrack', () => { rewind() });


    let timeout = null;
    document.getElementById('inject_speed').addEventListener('keyup', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            playback_speed(document.getElementById('inject_speed').value);
        }, 1000);
    });

    document.getElementById('inject_lock').onclick = () => {
        /* console.log(div.style.position); */
        fixed = (fixed === false) ? true : false;
        document.getElementById('inject_lock').innerText = (fixed === false) ? 'movable' : 'locked';
    };

    document.getElementById('inject_rewind_backward').onclick = () => { rewind(); };
    document.getElementById('inject_rewind_forward').onclick = () => { rewind(true); };

    /*events below make settings div movable*/
    movableDiv.addEventListener('mousedown', function (e) {
        isDown = true;
        offset = [movableDiv.offsetLeft - e.clientX, movableDiv.offsetTop - e.clientY];
    }, true);
    document.addEventListener('mouseup', function () { isDown = false; }, true);
    document.addEventListener('mousemove', function (event) {
        if (fixed === true) { return; }
        event.preventDefault();
        if (isDown) {
            movableDiv.style.left = (event.clientX + offset[0]) + 'px';
            movableDiv.style.top = (event.clientY + offset[1]) + 'px';
        }
    }, true);

    /*events below are replacement for mouse events, but only in android*/
    movableDiv.addEventListener('touchstart', function (e) {
        isDown = true;
        offset = [
            movableDiv.offsetLeft - e.touches[0].clientX,
            movableDiv.offsetTop - e.touches[0].clientY
        ];
    }, true);
    document.addEventListener('touchend', function () { isDown = false; }, true);
    document.addEventListener('touchmove', function (event) {
        if (fixed === true) { return; }
        if (isDown) {
            movableDiv.style.left = (event.touches[0].clientX + offset[0]) + 'px';
            movableDiv.style.top = (event.touches[0].clientY + offset[1]) + 'px';
        }
    }, true);

})();