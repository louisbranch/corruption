define(['underscore', 'backbone', 'models/bank', 'models/cards', 'config'], function (_, Backbone, Bank, Cards, Config) {

  var PHASES = ['beginning', 'main-1', 'combat', 'main-2', 'ending'];

  var Croupier = Backbone.Model.extend({

    initialize: function (player) {
      this.player = player;
      this.game = this.player.game;
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

    start: function () {
      this.set('phase', 'main-1');
    },

    newTurn: function () {
      this.set('phase', PHASES[0]);
      this.table.untapAll();
      this.drawCard();
      this.set('phase', PHASES[1]);
    },

    nextPhase: function () {
      this.verify({turn: true, phase: ['main-1', 'combat', 'main-2']});
      var currentPhase = this.get('phase');
      var nextPhase = PHASES[PHASES.indexOf(currentPhase) + 1];
      this.set('phase', nextPhase);
    },

    drawInitialHand: function () {
      this.library.draw(Config.initialHandCards, this.hand);
    },

    drawCard: function (n) {
      var n = n || 1;
      this.library.draw(n, this.hand);
    },

    castCard: function (card) {
      this.verify({turn: true, phase: ['main-1', 'main-2']});
      if (!this.hand.include(card)) { throw 'Card must be in your hand'; }
      if (!this.bank.payCost(card.get('cost'))) { throw 'Not enough funds'; }
      this.hand.remove(card);
      this.table.add(card);
    },

    endTurn: function () {
      this.verify({turn: true});
      this.set('phase', PHASES[4]);
      this.set('phase', null);
      this.table.endTurn();
      this.game.nextTurn();
    },

    isMyTurn: function () {
      return this.game.isPlayerTurn(this.player);
    },

    isPhase: function (phases) {
      var phase = this.get('phase');
      if (_.isArray(phases)) {
        return _.contains(phases, phase);
      }
      return phases === phase;
    },

    attack: function () {
      this.verify({turn: true, phase: 'combat'});
      if (!this.attackQueue.length) { throw 'No cards selected to attack' }
      _.forEach(this.attackQueue, function (card) {
        card.onAttack();
      });
      this.attackQueue = [];
      this.set('phase', PHASES[3]);
    },

    addToAttackQueue: function (card) {
      this.verify({turn: true, phase: 'combat'});
      var index = this.attackQueue.indexOf(card);
      if (index !== -1) { return; }
      this.attackQueue.push(card);
      this.trigger('change');
      return true;
    },

    removeFromAttackQueue: function (card) {
      var index = this.attackQueue.indexOf(card);
      if (index === -1) { return; }
      this.attackQueue.splice(index, 1);
      this.trigger('change');
      return true;
    },

    verify: function (conditions) {

      if (conditions.turn) {
        if (this.isMyTurn() !== conditions.turn) {
          throw new Error('Invalid turn action');
        }
      }

      if (conditions.phase) {
        if (!this.isPhase(conditions.phase)) {
          throw new Error('Invalid phase action');
        }
      }
    }

  });

  return Croupier;

});
