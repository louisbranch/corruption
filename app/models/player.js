define(['underscore', 'backbone', 'config', 'views/player', 'models/battlefield', 'models/bank', 'models/cards', 'models/turn_manager', 'models/attack_queue'],
function (_, Backbone, config, View, Battlefield, Bank, Cards, TurnManager, AttackQueue) {

  var Player = Backbone.Model.extend({

    initialize: function () {
      this.view = new View({model: this});

      this.battlefield = new Battlefield();
      this.bank = new Bank();
      this.turnManager = new TurnManager();
      this.hand = new Cards.Hand();
      this.table = new Cards.Table();
      this.graveyard = new Cards.Graveyard();
      this.library = new Cards.Library();
      this.attackQueue = new AttackQueue();

      _.each(['turnManager', 'hand', 'table', 'graveyard', 'library'], function (association) {
        this[association].player = this;
      }, this);
    },

    isMyTurn: function () {
      return this.game.isPlayerTurn(this);
    },

    newTurn: function () {
      this.turnManager.newTurn();
    },

    nextPhase: function (deferred) {
      this.turnManager.nextPhase();
      deferred.resolve();
    },

    endTurn: function (deferred) {
      this.turnManager.endTurn();
      deferred.resolve();
    },

    setDeck: function (cards) {
      this.library.reset(cards);
    },

    drawHand: function () {
      this.library.draw(config.initialHandCards, this.hand);
    },

    attack: function () {
      console.log('attack');
    },

    drawCard: function (n) {
      var n = n || 1;
      this.library.draw(n, this.hand);
    },

    render: function () {
      this.view.render();
    },

    castCard: function (deferred, card) {
      if (!this.turnManager.canCast()) {
        return deferred.reject('You can\'t cast a card in this phase!');
      }

      if (!this.hand.include(card)) {
        return deferred.reject('Card must be in your hand!');
      }

      if (!this.bank.payCost(card.get('cost'))) {
        return deferred.reject('Not enough funds!');
      }

      this.hand.remove(card);
      this.table.add(card);
      deferred.resolveWith(card);
    },

    addToAttackQueue: function (deferred, card) {
      if (!this.turnManager.canAttack()) {
        return deferred.reject('You can\'t attack during this phase!');
      }

      if (card.get('attack') === undefined) {
        return deferred.reject('This card cant attack');
      }

      if (card.isSick()) {
        return deferred.reject('A card can\'t attack in the 1st turn');
      }

      if (this.attackQueue.add(card)) {
        this.turnManager.trigger('change');
        deferred.resolveWith(card);
      }

    },

    startCombat: function (deferred) {
      this.attackQueue.attack();
      this.turnManager.nextPhase();
    },

    damageEnemy: function (amount) {
      var enemy = this.game.getEnemy(this);
      enemy.receiveDamage(amount);
    },

    receiveDamage: function (amount) {
      this.bank.removeFunds(amount);
    }

  });

  return Player;

});
