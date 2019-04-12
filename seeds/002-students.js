
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Kathryn', cohort_id: 1},
        {name: 'Harry', cohort_id: 2},
        {name: 'Oliver', cohort_id: 2},
        {name: 'Lilly', cohort_id: 3},
        {name: 'James', cohort_id: 1},
        {name: 'Sirius', cohort_id: 3}
      ]);
    });
};
