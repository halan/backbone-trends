var TwitterAPI = Backbone.Collection.extend({
  baseUrl: 'https://api.twitter.com/1/',
  url: function(){ return this.baseUrl+this.resourceUrl },
  fetch: function(options) {
    options || (options = {});
    options.dataType = "jsonp";
    return Backbone.Collection.prototype.fetch.call(this, options);
  },
});

var Trends = TwitterAPI.extend({
  resourceUrl: 'trends/daily.json',
  model: Trend,
  parse: function(response) { return _.first(_.toArray(response.trends));  }
});

var SearchTweets = TwitterAPI.extend({
  baseUrl: 'http://search.twitter.com/',
  resourceUrl: 'search.json',
  parse: function(response) { return response.results; },
  search: function(term) {
    this.trigger('willSearch');
    return this.fetch({data: {q: term}});
  }
})

