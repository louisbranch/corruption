define(['underscore', 'backbone', 'models/bank', 'models/cards', 'config'], function (_, Backbone, Bank, Cards, Config) {

  // PHASES = ['beginning', 'main-1', 'combat', 'main-2', 'ending'];

  var Croupier = Backbone.Model.extend({

    initialize: function (player) {
      this.player = player;
      this.bank = new Bank(this);
      this.attackQueue = [];
      this.set('phase', null, {silent: true});
    },

    setDeck: function (cards) {
      this.library = new Cards.Library(cards, this);
      this.hand = new Cards.Hand([],this);
      this.table = new Cards.Table([],this);
      this.graveyard = new Cards.Graveyard([],this);
    },

    newTurn: function () {
      this.set('phase', 'beginning');
      this.table.untapAll();
      this.drawCard();
      this.set('phase', 'main-1');
    },

    drawInitialHand: function () {
      this.library.draw(Config.initialHandCards, this.hand);
    },

    drawCard: function (n) {
      var n = n || 1;
      this.library.draw(n, this.hand);
    },

    castCard: function (card) {
      if (!this.hand.include(card)) { throw 'Card must be in your hand'; }
      if (!this.bank.payCost(card.get('cost'))) { throw 'Not enough funds'; }
      if (!this.isHisTurn()) { throw 'It is not your turn yet'; }
      if (!this.isPhase('main-1', 'main-2')) { throw 'You cant cast a card during this phase.'}
      this.hand.remove(card);
      this.table.add(card);
    },

    endTurn: function () {
      if (!this.isHisTurn()) { throw 'It is not your turn'; }
      this.set('phase', 'ending');
      this.set('phase', null);
      this.table.endTurn();
      this.player.game.nextTurn();
    },

    isHisTurn: function () {
      return this.player.game.isPlayerTurn(this.player);
    },

    isPhase: function (/*phases*/) {
      var phases = _.toArray(arguments);
      return _.contains(phases, this.get('phase'));
    },

    attack: function () {
      if (!this.isPhase('main-1')) { throw 'You cant attack during this phase' }
      if (!this.attackQueue.length) { throw 'No cards selected to attack' }
      this.set('phase', 'combat');
      _.forEach(this.attackQueue, function (card) {
        card.onAttack();
      });
      this.set('phase', 'main-2');
    },

    addToAttackQueue: function (card) {
      var index = this.attackQueue.indexOf(card);
      if (index === -1) {
        this.attackQueue.push(card);
      }
    },

    removeFromAttackQueue: function (card) {
      var index = this.attackQueue.indexOf(card);
      if (index >= 0) {
        this.attackQueue.splice(index, 1);
      }
    }

  })

  return Croupier;

});
