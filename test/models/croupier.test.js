define(['/js/models/croupier.js'], function (Croupier) {

  module('Croupier - Attack queue', {
    setup: function () {
      this.card = {id: 1};
      this.card2 = {id: 2};
      this.croupier = new Croupier();
    }
  });

  test('Add one card', function () {
    this.croupier.addToAttackQueue(this.card);
    deepEqual(this.croupier.attackQueue, [this.card]);
  });

  test('Add multiple cards', function () {
    this.croupier.addToAttackQueue(this.card);
    this.croupier.addToAttackQueue(this.card2);
    deepEqual(this.croupier.attackQueue, [this.card, this.card2]);
  });

  test('Card is not added twice', function () {
    this.croupier.addToAttackQueue(this.card);
    this.croupier.addToAttackQueue(this.card);
    deepEqual(this.croupier.attackQueue, [this.card]);
  });

  test('Remove card', function () {
    this.croupier.addToAttackQueue(this.card);
    this.croupier.addToAttackQueue(this.card2);
    this.croupier.removeFromAttackQueue(this.card);
    deepEqual(this.croupier.attackQueue, [this.card2]);
  });

  test('Attack with cards in queue',  function () {
    expect(2);
    var onAttack = function () {ok(true)};

    this.croupier.addToAttackQueue(this.card);
    this.croupier.addToAttackQueue(this.card2);

    this.card.onAttack = onAttack;
    this.card2.onAttack = onAttack;

    this.croupier.attack();
  });

});
