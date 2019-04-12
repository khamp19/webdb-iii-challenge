
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Web_17'},
        {name: 'iOS_3'},
        {name: 'DS_10'}
      ]);
    });
};
