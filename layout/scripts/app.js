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

	const contentBtn = document.querySelector('.content-btn')
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

	/* create content menu */
	const container = document.querySelector('.content-menu-box');
	if(container) {
		let article = document.querySelector('.article');
	    let headings = article.querySelectorAll('h2, h3');
	    if(headings.length) {
			let ol = document.createElement('ol');
			ol.classList.add('content-menu');
			let list = '';

			for(let i = 0, length = headings.length; i < length; i++) {
				if(headings[i+1] && headings[i+1].nodeName === 'H3' && headings[i].nodeName !== 'H3'){
					list += '<li><a href="#si-'+i+1+'">'+headings[i].innerText+'</a>';
					headings[i].innerHTML += '<span id="si-'+i+1+'" class="additional-padding"></span>';
				} else if(headings[i-1] && headings[i-1].nodeName !== 'H3' && headings[i].nodeName === 'H3') {
					list += '<ol>';
					list += '<li><a href="#si-'+i+1+'">'+headings[i].innerText+'</a></li>';
					headings[i].innerHTML += '<span id="si-'+i+1+'" class="additional-padding"></span>';
				} else if( headings[i].nodeName === 'H3') {
					list += '<li><a href="#si-'+i+1+'">'+headings[i].innerText+'</a></li>';
					headings[i].innerHTML += '<span id="si-'+i+1+'" class="additional-padding"></span>';
				} else if( headings[i-1] && headings[i-1].nodeName === 'H3' && headings[i].nodeName === 'H2'){
					list += '</ol>'
					list += '</li>';
				}
				else {					
					list += '<li><a href="#si-'+i+1+'">'+headings[i].innerText+'</a></li>';
					headings[i].innerHTML += '<span id="si-'+i+1+'" class="additional-padding"></span>';
				}
			}
			ol.innerHTML += list
	       	container.append(ol); 
	    } else {
			document.querySelector('.content').remove();
		}
	}

	/* copy the text when clicking */
	const email = document.querySelector('.footer-mail');
	if(email) {
		email.addEventListener('click', function (e) {
			let tempInput = document.createElement("input");
			tempInput.style = "position: absolute; left: -1000px; top: -1000px";
			tempInput.value = this.innerText;
			document.body.appendChild(tempInput);
			tempInput.select();
			let is_copied = document.execCommand("copy");
			if(is_copied) {
				this.innerText = 'Скопировано';
				document.body.removeChild(tempInput);
			}
		});
	}

})

