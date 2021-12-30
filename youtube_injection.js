javascript: (function () {
    var rewindBack = document.createElement('button');
    rewindBack.style.position = 'absolute';
    rewindBack.id = 'inject_rewind_backward';
    rewindBack.innerText = 'rewind by 2sec';
    rewindBack.style.background = 'red';
    rewindBack.style.color = 'white';
    rewindBack.style.width = '100%';
    rewindBack.style.height = '10%';
    rewindBack.style.zIndex = '9999';
    /*injects html to the beginning of webpage*/
    document.getElementsByTagName('body')[0].prepend(rewindBack);
    document.getElementById('inject_rewind_backward').addEventListener('click', function () {
        let v = document.querySelector('video');
        v.currentTime = v.currentTime - parseFloat(2);
    });
})();