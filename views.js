var TrendView = Backbone.View.extend({
  tagName: 'span',
  render: function(){
    var t = _.template('<a href="#trend/<%= query %>"><%= query %></a> ')
    this.$el.html(t(this.model.attributes));
    return this;
  }
})

var TweetView = Backbone.View.extend({
  render: function(){
    var t = _.template('<p><%= text %></p>');
    this.$el.html(t(this.model.attributes));
    return this;
  }
});

var CollectionView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('reset', this.renderCollection, this);
  },

  renderBase: function(){
   return this.$el.html('');
  },

  renderCollection: function(){
    this.renderBase();
    this.collection.each(function(model){
      new this.model({model: model}).render().$el.appendTo(this.$el);
    }, this);
    return this;
  }
});

var TrendsView = CollectionView.extend({
  initialize: function(){
    this.collection = new Trends();
    CollectionView.prototype.initialize.call(this);
    this.collection.fetch();
  },

  model: TrendView
});

var SearchView = CollectionView.extend({
  renderBase: function(){ this.$el.html('<a href="#">Voltar</a>'); },
  model: TweetView
})

var AppView = Backbone.View.extend({
  render: function(view){
    this.$el.html(view.render().$el);
  }
})
