/*
 * Inline text editing tool for Raphaël 2.0 & compatible with Raphaël Free transform.
 * Source: https://github.com/marmelab/Raphael.InlineTextEditing
 * Licensed under the MIT license
 */
(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["lentillesPCI/interaction/runtime/js/lib/raphael.min"], function(Raphael) {
			// Use global variables if the locals are undefined.
			return factory(Raphael || root.Raphael);
		});
	} else {
		// RequireJS isn't being used. Assume Raphael is loaded in <script> tag
		factory(Raphael);
	}
}(this, function(Raphael) {

	Raphael.fn.inlineTextEditing = function(subject, options, callback) {

		// Store instance of the Raphael paper
		var paper = this;

		subject.inlineTextEditing = {
			paper : paper,
			input: null,

			/**
			 * Start text editing by hiding the current element and adding a text field at the same position
			 * @return jQuery input element
			 */
			startEditing: function(){
				// Store Raphael container above the svg
				var container      = this.paper.canvas.parentNode;
				var translateX	    = 0;
				var translateY	    = 0;
				var transformOrder  = {};

				// Retrieve element transformation
				var rotation        = subject._.deg;
				var scaleX          = subject._.sx;
				var scaleY          = subject._.sy;
				var matrix          = subject.node.getAttribute('transform');

				// Check if the element has translations & retrieve transformations order
				for(var i = 0, length = subject._.transform.length; i < length; i++){
					var matrixComponents = subject._.transform[i];
					var transform = matrixComponents[0].toLowerCase();
					transformOrder[transform] = transform;

					if(transform == 't'){
						translateX += matrixComponents[1];
						translateY += matrixComponents[2];
					}
				}


				// Check if there is implicit matrix
				for(var i = 0, length = subject._.transform.length; i < length; i++){
					if(subject._.transform[i][0].toLowerCase() == 'm'){
						var matrixComponents = subject._.transform[i].slice(1);

						// Perform transformation from matrix elements
						rotation  += -1 * Math.asin(matrixComponents[2]) * 180 / Math.PI;
						scaleX    *= matrixComponents[0] / Math.cos(rotation*Math.PI/180);
						scaleY    *= matrixComponents[3] / Math.cos(rotation*Math.PI/180);

						transformOrder = {r: 'r', s:'s'};
					}
				}

				// Remove transformation on the current element to retrieve original dimension
				subject.node.removeAttribute('transform');

				var originalBbox  = subject._getBBox();
				var width         = originalBbox.width;
				var height        = originalBbox.height;
				var x             = container.offsetLeft + subject.attrs.x + translateX;
				var y             = container.offsetTop + subject.attrs.y - height / 2 + translateY;
				var sTransform    = '';
				var sOrigin       = 'center center';
				var oTransform    = {
					//	t : 'translate('+(translateX)+'px, '+(translateY)+'px)',
					r : 'rotate('+rotation+'deg)',
					s : 'scale('+scaleX+', '+scaleY+')'
				};

				// Build transform CSS property in the same order than the element
				for(var transform in transformOrder){
					if(oTransform[transform] != undefined){
						sTransform += oTransform[transform] + ' ';
					}
				}

				// Re-apply stored transformation to the element and hide it
				if(matrix != null){subject.node.setAttribute("transform", matrix);}
				subject.hide();

				// Prepare input styles
				var oStyles = {
					position: 'absolute',
					background: 'white',
					left: (x-50) +'px',
					top: (y+50)+'px',
					'width': (30+width) +'px',
					'min-height': height+'px',
					color: subject.attrs.fill,
					

					'-moz-transform-origin': sOrigin,
					'-ms-transform-origin': sOrigin,
					'-o-transform-origin': sOrigin,
					'-webkit-transform-origin': sOrigin,
					'transform-origin': sOrigin,

					'-moz-transform' : sTransform,
					'-ms-transform' : sTransform,
					'-o-transform' : sTransform,
					'-webkit-transform' : sTransform,
					'transform' : sTransform
				};

				// Retrieve font styles
				var aFontAttributes = ['font', 'font-family', 'font-size', 'font-style', 'font-weight', 'font-variant'/*, 'line-height'*/];

				for(var i = 0, length = aFontAttributes.length; i < length; i++){
					var attribute = aFontAttributes[i];

					if(subject.attrs[attribute] != undefined){
						oStyles[attribute] = subject.attrs[attribute];
					}

					if(subject.node.style[attribute] != undefined){
						oStyles[attribute] = subject.node.style[attribute];
					}
				}

				var sStyles = '';
				for(var z in oStyles){
					sStyles += z + ':' + oStyles[z] + ';';
				}

				// Create an input element with theses styles
				this.input = document.createElement("INPUT");
				this.input.setAttribute("type", "text");
				this.input.value = subject.attrs.text ? subject.attrs.text.replace(/\'/g,"\\\'") : '';
				this.input.setAttribute("style", sStyles);

				this.input.addEventListener('keyup', this._handleKeyDown.bind(this));

				// Add the input in the container and apply focus on it
				container.appendChild(this.input);
				this.input.focus();
				this.input.select();
				
				return this.input;
			},

			/**
			 * Apply text modification and remove associated input
			 */
			stopEditing: function(defaultText){

				// Set the new the value
				if(this.input.value == '' || this.input.value == '\n' || this.input.value == ' \n' ){subject.attr("text", defaultText);}
				else{subject.attr("text", this.input.value);}

				// Show the text element
				subject.show();
				

				// Remove text input
				this.input.parentNode.removeChild(this.input);

				
			},

			_handleKeyDown: function(e){
				var tmp               = document.createElement("span");
				var text              = this.input.value;
				tmp.setAttribute('style', this.input.style.cssText);
				tmp.style.height      = null;
				tmp.style.width       = null;
				tmp.style.visibility  = 'hidden';
				tmp.innerHTML         = text.split('\n').join('<br />');

				this.input.parentNode.appendChild(tmp);

				this.input.style.width = tmp.offsetWidth + "px";
				this.input.style.height = tmp.offsetHeight + "px";

				tmp.parentNode.removeChild(tmp);
			}
		};

		return subject.inlineTextEditing;
	}

}));
