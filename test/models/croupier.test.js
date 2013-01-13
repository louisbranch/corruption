define(['/js/models/croupier.js'], function (Croupier) {

  module('Croupier - Attack queue', {
    setup: function () {
      this.croupier = new Croupier();
      this.card = {id: 1};
      this.card2 = {id: 2};
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

  module('Croupier - Is Phase', {
    setup: function () {
      this.croupier = new Croupier();
    }
  });

  test('Verify a single phase', function () {
    this.croupier.set('phase', 'beginning');
    ok(this.croupier.isPhase('beginning'));
    ok(!this.croupier.isPhase('main1'));
  });

  test('Verify multiple phases', function () {
    this.croupier.set('phase', 'main-2');
    ok(this.croupier.isPhase('main-1', 'main-2'));
  });

});
