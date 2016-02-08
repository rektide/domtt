var
  tt= require("tagged-template")

var _default

function Domtt( opts){

	// detect usage as a tagged template function
	// and use the instantiated _default Domtt
	if(arguments[0] instanceof Array){
		return _default.aply(null, arguments)
	}

	// evaluator function
	opts= opts|| {}
	var
	  tag= opts.tag|| "div",
	  doc= opts.document|| document
	function domtt(){
		var
		  el= doc.createElement( "div"), // element created
		  str= tt.apply( null, arguments) // reduce to string
		el.innerHTML= str // assign
		return el // return
	}

	// chainable get/setters for options
	function accessorDoc( val){
		if(arguments.length === 0){
			return doc
		}
		doc= val
		return this
	}
	Object.defineProperty(domtt, "document", {
		get: accessorDoc
	})
	function accessorTag( val){
		if(arguments.length === 0){
			return tag
		}
		tag= val
		return this
	}
	Object.defineProperty(domtt, "tag", {
		get: accessorTag
	})

	// create a derived tagged template parser
	function clone(extra){
		var
		  doc= extra.doc|| this.doc(),
		  tag= extra.tag|| this.tag()
		return Domtt({doc, tag})
	}
	Object.defineProperty(domtt, "clone", {
		get: clone
	})

	return domtt
}

try
{
	_default= Domtt()
}catch(ex){
}

module.exports = Domtt
