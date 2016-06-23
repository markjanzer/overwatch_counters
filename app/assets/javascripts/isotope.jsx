//= require isotope.pkgd.min

// Isotope
var isotope = {
	setup: function() {
		this.iso = new Isotope( '.counters' , {
		  itemSelector: '.counter',
		  // percentPosition: true
		  layoutMode: 'fitRows',
		  getSortData: {
		  	counterScore: '.counterScore'
		  },
		  sortBy: 'counterScore'
		});
	},
	sortIso: function() {
		this.iso.isotope('updateSortData').isotope();
	}
}

// var $grid = $('.counters').isotope({
// 	getSortData: {
// 		counterScore: '.counterScore'
// 	},
// 	sortBy: 'counterScore'
// })

// var sortIsotope = function() {
// 	$grid.isotope('updateSortData').isotope();
// }


// isotope.prototype.setUp({})
// var grid = $('.counters')[0];


// var iso = new Isotope( grid , {
//   itemSelector: '.counter',
//   // percentPosition: true
//   layoutMode: 'fitRows'
// });

// imagesLoaded( grid, function() {
//   iso.layout();
// });
// iso.layout();

// var categories = document.getElementsByClassName('category');

// for ( var i = 0; i < categories.length; i++ ) {
//   categories[i].addEventListener( 'click', function(e) {
//     var categoryValue = e.target.getAttribute('data-category'),
//         categoryActive = document.getElementsByClassName('category is-active')[0];
//     iso.arrange({ filter: categoryValue });
//     classie.remove(categoryActive, 'is-active');
//     classie.add(e.target, 'is-active');
//   });
// }
