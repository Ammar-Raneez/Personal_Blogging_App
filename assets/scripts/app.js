const Portfolio = function() {
	function makeWords() {
		var words = [
			{
				text: "html5",
				weight: 12.3
			}, {
				text: "css3",
				weight: 8
			}, {
				text: "javascript",
				weight: 14
			}, {
				text: "react",
				weight: 8
			}, {
				text: "react-native",
				weight: 8
			}, {
				text: "programming",
				weight: 7
			}, {
				text: "python",
				weight: 10
			}, {
				text: "java",
				weight: 9
			}
		];
		return words;
	}

	function makeWordCloud(words) {
		$('.teaching-domains').jQCloud(words, {delay: 120});
	}

	function displayWordCloud() {
		var count = 1;
		$(window).on('scroll', function() {
			var y_scroll_pos = window.pageYOffset;
			var scroll_pos_test = 2700; // set to whatever you want it to be
			var words = makeWords();
			if (y_scroll_pos > scroll_pos_test && count <= 1) {
				makeWordCloud(words);
				count++;
			}
		});
	}

	function typeAnimation() {
		Typed.new("#writing-text", {
			strings: [
				"am an aspiring Full Stack Web Developer.", "love solving problems.", "also teach programming to people.", "love pushing my limits!!"
			],
			// Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
			stringsElement: null,
			// typing speed
			typeSpeed: 1,
			contentType: 'text',
			callback: function() {
				$("#writing-text").css({"color": "#fff", "background-color": "#f00"});
			},
			preStringTyped: function() {},
			onStringTyped: function() {}
		});

		var date = new Date();
		document.getElementById("date").innerText = date.getFullYear();
	}

	return {
		displayWordCloud: displayWordCloud,
		typeAnimation: typeAnimation
	}
}();


Portfolio.displayWordCloud();
Portfolio.typeAnimation();
