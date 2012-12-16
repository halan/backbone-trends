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
    this.$el = $(el);
    Backbone.history.start();
  },

  show: function(view){
    this.$el.html(view.render().$el);
  },

  index: function(){
    this.show(this.trendsView);
  },

  trend: function(query){
    this.searcher.search(query);
    this.show(this.searchView);
  }
}))();

