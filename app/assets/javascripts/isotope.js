//= require isotope.pkgd.min

// Isotope
// var grid = document.getElementsByClassName('js-cards')[0];
// // var grid = document.getElementById('projects');
// if ( grid ) {
//   var iso = new Isotope( grid, {
//     itemSelector: '.js-card',
//     percentPosition: true
//   });

//   imagesLoaded( grid, function() {
//     iso.layout();
//   });
//   // iso.layout();

//   var categories = document.getElementsByClassName('category');

//   for ( var i = 0; i < categories.length; i++ ) {
//     categories[i].addEventListener( 'click', function(e) {
//       var categoryValue = e.target.getAttribute('data-category'),
//           categoryActive = document.getElementsByClassName('category is-active')[0];
//       iso.arrange({ filter: categoryValue });
//       classie.remove(categoryActive, 'is-active');
//       classie.add(e.target, 'is-active');
//     });
//   }
// }