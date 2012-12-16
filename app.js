var app = new (Backbone.Router.extend({
  routes: {
    ""             : "index",
    "trend/:trend" : "trend"
  },

  initialize: function(){
    this.trendsView = new TrendsView();
    this.searcher   = new SearchTweets();
    this.searchView = new SearchView({collection: this.searcher});
  },

  start: function(el){
    this.appView = new AppView({el: el});
    Backbone.history.start();
  },

  index: function(){
    this.appView.render(this.trendsView);
  },

  trend: function(query){
    this.searcher.search(query);
    this.appView.render(this.searchView);
  }
}))();

