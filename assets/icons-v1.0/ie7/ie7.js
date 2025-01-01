/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-chevron-right': '&#xe900;',
		'icon-chevron-left': '&#xe901;',
		'icon-chevron-down': '&#xe902;',
		'icon-chevron-up': '&#xe903;',
		'icon-home3': '&#xe904;',
		'icon-newspaper': '&#xe905;',
		'icon-pencil': '&#xe906;',
		'icon-camera': '&#xe90f;',
		'icon-location': '&#xe947;',
		'icon-location2': '&#xe948;',
		'icon-clock': '&#xe94e;',
		'icon-printer': '&#xe954;',
		'icon-keyboard': '&#xe955;',
		'icon-display': '&#xe956;',
		'icon-laptop': '&#xe957;',
		'icon-mobile': '&#xe958;',
		'icon-mobile2': '&#xe959;',
		'icon-tablet': '&#xe95a;',
		'icon-bubble': '&#xe96b;',
		'icon-bubbles': '&#xe96c;',
		'icon-bubbles2': '&#xe96d;',
		'icon-search': '&#xe986;',
		'icon-zoom-in': '&#xe987;',
		'icon-zoom-out': '&#xe988;',
		'icon-attachment': '&#xe9cd;',
		'icon-eye': '&#xe9ce;',
		'icon-star-empty': '&#xe9d7;',
		'icon-star-half': '&#xe9d8;',
		'icon-star-full': '&#xe9d9;',
		'icon-heart': '&#xe9da;',
		'icon-warning': '&#xea07;',
		'icon-checkmark': '&#xea10;',
		'icon-play3': '&#xea1c;',
		'icon-pause2': '&#xea1d;',
		'icon-stop2': '&#xea1e;',
		'icon-backward2': '&#xea1f;',
		'icon-forward3': '&#xea20;',
		'icon-first': '&#xea21;',
		'icon-last': '&#xea22;',
		'icon-previous2': '&#xea23;',
		'icon-next2': '&#xea24;',
		'icon-eject': '&#xea25;',
		'icon-volume-high': '&#xea26;',
		'icon-volume-medium': '&#xea27;',
		'icon-volume-low': '&#xea28;',
		'icon-volume-mute': '&#xea29;',
		'icon-volume-mute2': '&#xea2a;',
		'icon-volume-increase': '&#xea2b;',
		'icon-arrow-up-left2': '&#xea39;',
		'icon-arrow-up2': '&#xea3a;',
		'icon-arrow-up-right2': '&#xea3b;',
		'icon-arrow-right2': '&#xea3c;',
		'icon-arrow-down-right2': '&#xea3d;',
		'icon-arrow-down2': '&#xea3e;',
		'icon-arrow-down-left2': '&#xea3f;',
		'icon-arrow-left2': '&#xea40;',
		'icon-circle-up': '&#xea41;',
		'icon-circle-right': '&#xea42;',
		'icon-circle-down': '&#xea43;',
		'icon-circle-left': '&#xea44;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
