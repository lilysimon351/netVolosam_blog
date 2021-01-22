document.addEventListener('DOMContentLoaded', function(){
	/* content sticky */
	function makeSticky() {
		let artTop = document.querySelector('.content');
		let commentBox = document.querySelector('.comment-form-box')
		let scrollVer = window.scrollY;
		if(artTop) {
			if (document.body.scrollTop > artTop.getBoundingClientRect().top + scrollVer || document.documentElement.scrollTop > artTop.getBoundingClientRect().top + scrollVer ) {
				if(document.body.scrollTop > commentBox.getBoundingClientRect().top + scrollVer || document.documentElement.scrollTop > commentBox.getBoundingClientRect().top + scrollVer) {
					artTop.classList.remove('sticky-content');
				} else {
					artTop.classList.add('sticky-content');
				}
			} else {
				artTop.classList.remove('sticky-content');
			}
		}
	}

	let contentBtn = document.querySelector('.content-btn')
	if(contentBtn) {
		contentBtn.addEventListener('click', (e) => {
			let content = document.querySelector('.content-hidden');
			content.classList.remove('d-none');
			let close = document.querySelector('.content-close-btn');
			close.addEventListener('click', () => content.classList.add('d-none') )
		});
	}

	makeSticky();
	window.addEventListener('scroll', makeSticky);

	/* typing animation */
	class Writer {
		constructor(node) {
			this.node = node;

			if (!this.node) return;

			this.timer = 146;
			this.broken = this.node.textContent.split('');

			this._init();
		}

		_init() {
			this.node.textContent = '';
			let i = 0;

			let interval = setInterval(() => {
				this.node.textContent += this.broken[i];

				i++;

				if (i >= this.broken.length) clearInterval(interval);
			}, this.timer);
		}
	}

	const root = document.querySelector('.typing');
	if(root) {
		new Writer(root);
	}

	/* scroll to heading */
	const anchors = document.querySelectorAll('.content-menu a[href*="#"]')

	for (let anchor of anchors) {
	  anchor.addEventListener('click', function (e) {
	    e.preventDefault()
	    
	    const blockID = anchor.getAttribute('href').substr(1)
	    
	    document.getElementById(blockID).scrollIntoView({
	      behavior: 'smooth',
	      block: 'start'
	    })
	  })
	}
})

