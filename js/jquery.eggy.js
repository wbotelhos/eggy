/**
 * jQuery Eggy - A Easter Eggy Plugin - http://wbotelhos.com/eggy
 * ---------------------------------------------------------------------------------
 *
 * jQuery Eggy is a plugin that generates a customizable Easter Egg fired from a character set.
 *
 * Licensed under The MIT License
 *
 * @version			0.1.0
 * @since			12.04.2010
 * @author			Washington Botelho dos Santos
 * @documentation	http://wbotelhos.com/eggy
 * @twitter			http://twitter.com/wbotelhos
 * @license			http://opensource.org/licenses/mit-license.php
 * @package			jQuery Plugins
 *
 * Usage with default values:
 * ---------------------------------------------------------------------------------
 * $('#eggy').eggy({
 *   code: ['y', 'e', 'a', 'h', '!']
 * });
 *
 * <div id="eggy"></div>
 *
 */

;(function($) {

	$.fn.eggy = function(settings) {
		var opt = $.extend({}, $.fn.eggy.defaults, settings);

		if (this.length == 0) {
			debug('Selector invalid or missing!');
			return;
		} else if (this.length > 1) {
			return this.each(function() {
				$.fn.eggy.apply($(this), [settings]);
			});
		}

		var $this	= $(this),
			typed	= [],
			$eggy	=
				$('<div/>').css({
					background:	"url('" + opt.image + "') no-repeat",
					bottom:		0,
					//display:	'none',
					height:		opt.height,
					position:	'fixed',
					width:		opt.width
				})
				.css(opt.side, -1 * opt.width)
				.html($this)
				.appendTo('body');

		$(document).keypress(_combine);

		function _anime() {
			var direction	= (opt.side == 'right') ? {'right': 0} : {'left': 0},
				space		= $eggy.outerWidth(),
				extension	= opt.sound.substring(opt.sound.lastIndexOf('.') + 1, opt.sound.length);

			if (opt.sound) {
				$eggy.append('<embed src="' + opt.sound + '" hidden="true" type="audio/' + extension + '" autostart="true">');
			}

			$eggy
			//.show()
			.animate(direction, opt.speed, 'swing', function() {
				direction = (opt.side == 'right') ? {'right': -1 * space} : {'left': -1 * space};

				setTimeout(function() {
					$eggy
					.animate(direction, opt.speed, 'swing')
						.children('embed').remove();
				}, opt.pause);
			});
		};

		function _combine(evt) {
			if (evt.target.toString() == '[object HTMLHtmlElement]' || evt.target.toString() == '[object HTMLBodyElement]') {
				var key		= (evt.charCode) ? evt.charCode : (evt.keyCode) ? evt.keyCode : evt.which,
					text	= $.fn.eggy.codes[key];

				typed.push(text);

				if (text != opt.code[typed.length - 1]) {
					typed = [];
				} else if (typed.length == opt.code.length) {
					if (typed.join('') == opt.code.join('')) {
						_anime();
					}

					typed = [];
				}
			}
		};

		return $this;
	};

	$.fn.eggy.codes = {
		8: 'backspace',
		9: 'table',

		13: 'enter',

		27: 'esc',

		32: ' ',
		33: '!',
		34: '"',
		35: '#',
		36: '$',
		37: 'left',		// %
		38: 'up',		// &
		39: 'right',	// `
		40: 'down',		// (
		41: ')',
		42: '*',
		43: '+',
		44: ',',
		45: '-',
		46: '.',		// del
		47: '/',
		48: '0',
		49: '1',
		50: '2',
		51: '3',
		52: '4',
		53: '5',
		54: '6',
		55: '7',
		56: '8',
		57: '9',
		58: ':',
		59: ';',
		60: '<',
		61: '=',
		62: '>',
		63: '?',
		64: '@',
		65: 'A',
		66: 'B',
		67: 'C',
		68: 'D',
		69: 'E',
		70: 'F',
		71: 'G',
		72: 'H',
		73: 'I',
		74: 'J',
		75: 'K',
		76: 'L',
		77: 'M',
		78: 'N',
		79: 'O',
		80: 'P',
		81: 'Q',
		82: 'R',
		83: 'S',
		84: 'T',
		85: 'U',
		86: 'V',
		87: 'W',
		88: 'X',
		89: 'Y',
		90: 'Z',
		91: '[',
		92: '\\',
		93: ']',
		94: '^',
		95: '_',
		97: 'a',
		98: 'b',
		99: 'c',
		100: 'd',
		101: 'e',
		102: 'f',
		103: 'g',
		104: 'h',
		105: 'i',
		106: 'j',
		107: 'k',
		108: 'l',
		109: 'm',
		110: 'n',
		111: 'o',
		112: 'p',
		113: 'q',
		114: 'r',
		115: 's',
		116: 't',
		117: 'u',
		118: 'v',
		119: 'w',
		120: 'x',
		121: 'y',
		122: 'z',
		123: '{',
		124: '|',
		125: '}',
		126: '~'
	};

	$.fn.eggy.defaults = {
		code:		[],
		height:		160,
		image:		'img/eggy.png',
		pause:		480,
		side:		'right',
		sound:		'sound/eggy.wav',
		speed:		200,
		width:		160
	};

	function debug(message) {
		if (window.console && window.console.log) {
			window.console.log(message);
		}
	};

})(jQuery);