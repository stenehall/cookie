(function($) {

	var cookies = [];
	var methods = {
		init: function(options, values) {
			cookies = values;
			var that = this;
			if ( ! $.cookie('oktosetcookies')) {
				$(this).append('<div id="cookie"><p>Sedan den första juli måste användaren av en site godkänna all användning av så kallade kakor på siten. Det betyder att du nu kan välja att klicka ja för att godkänna sparandet av kakor från den här siten på din dator. Eller kan klicka "nej men spara mitt val" för att spara ditt nej som en kaka. Det senare valet innebär att vi inte måste ställa den här frågan till dig varje gång du besöker vår sida, men det innebär också att vi spara EN kaka på din dator. Denna kaka kommer enbart att vara ett sant/falskt värde.</p><p><button id="yes">Ja</button><button id="no">Nej, men spara mitt val</button></p></div>');
				$('#cookie').slideDown();
				$('#yes').click(function() {
					methods['yes'].apply('yes');
				});

				$('#no').click(function() {
					methods['no'].apply('no');
				});
			}
		},

		no: function(key, value) {
			$('#cookie').slideUp(function() {$(this).remove();});
			$('#cookie').slideUp().remove();
		},

		yes: function(key, value) {
			$.cookie('oktosetcookies', 'true');
			$('#cookie').slideUp(function() {$(this).remove();});
			for(var i in cookies)
			{
				$.cookie(i, cookies[i]);
			}
		}
	};

	$.fn.cookie = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

})(jQuery);