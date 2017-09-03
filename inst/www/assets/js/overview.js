$(document).ready(function(){
  var urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('id')) {
    var id = urlParams.get('id').toUpperCase();
    $('#title').html('Rally  ' + id + ' Overview');

    $.getJSON('overview/' + id + '.json', function(data) {
      var mrk = ['background', 'motivation', 'focus', 'data_outcomes', 'data_predictors', 'methods', 'findings', 'value', 'deliverables'];
      mrk.forEach(function(nm) {
        if ($.isArray(data[nm])) {
          data[nm] = data[nm].join("\n");
        }
        data[nm] = marked(data[nm]);
      });

      var template = $('#template').html();
      Mustache.parse(template);   // optional, speeds up future uses
      var rendered = Mustache.render(template, data);
      $('#overview-data').html(rendered);
      // make unordered lists show up correctly
      $("#overview-data ul").addClass("browser-default");
    });
  }
});