(function(){
	let current_url = document.location.pathname + document.location.search;
	let evt_locked = {};

	function handler(e) {
		let skip_rec_flag = false;

		if(typeof evt_locked[e.type] !== 'undefined') {
			skip_rec_flag = true;
			clearTimeout(evt_locked[e.type]);
		}

		evt_locked[e.type] = setTimeout(function(){
			delete evt_locked[e.type];
		}, 1000);

		if(skip_rec_flag) {
			return;
		}

		if(e.type === 'locationchange') {
			current_url = e.detail;				
		}

		let evt_data = {
			target: e.target.nodeName,
			type: e.type,
			pointer: _pointerEventToXY(e)
		};

		if(e.target.nodeType === Node.DOCUMENT_NODE) {
			evt_data.target = 'document';
		} else if(e.target.nodeType === Node.ELEMENT_NODE) {
			if(e.target.className) {
				evt_data.target += '.' + e.target.className.replace(/\s+/g, '.');
			}

			if(e.target.id) {
				evt_data.target += '#' + e.target.id;
			}
		} else if(e.target.nodeType === Node.TEXT_NODE) {
			evt_data.target = e.target.textContent;
		} else {
			return;
		}

		_rec(evt_data);
	}

	function _pointerEventToXY(e){
    	var out = {x: 0, y: 0, scrollX: 0, scrollY: 0};

        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
            var touch = e.touches[0] || e.changedTouches[0];

            out.x = touch.pageX;
            out.y = touch.pageY;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
            out.x = e.pageX;
            out.y = e.pageY;
        }

    	var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

        out.scrollX = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
        out.scrollY = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;        

        out.x = parseInt(out.x);
        out.y = parseInt(out.y);
        out.scrollX = parseInt(out.scrollX);
        out.scrollY = parseInt(out.scrollY);

        return out;
    };

	function _rec(evt_data) {
		evt_data.url = current_url;

        try {
            evt_data.history = window.history.length;
        } catch(e) {}

		fetch('/rec_record.php', {headers: {"Content-Type": "application/json"}, method: "POST", body: JSON.stringify(evt_data)});
	}

	_rec({
		target: 'document',
		type: 'locationchange',
		pointer: {x: 0, y: 0, scrollX: 0, scrollY: 0}
	});

	document.addEventListener('mousemove', handler);
	document.addEventListener('mousedown', handler);
	document.addEventListener('mouseup', handler);
	document.addEventListener('scroll', handler);
	document.addEventListener('keydown', handler);
	document.addEventListener('keyup', handler);
	document.addEventListener('touchstart', handler);
	document.addEventListener('touchend', handler);
	document.addEventListener('touchmove', handler);
	document.addEventListener('wheel', handler);
	document.addEventListener('locationchange', handler);
})();
