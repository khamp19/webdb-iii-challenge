//- `id`: primary key, auto - increments.
//- `name`: text, required.
//- `cohort_id`: references the`id` in the cohorts table.
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl){
    tbl.increments();

    tbl
      .string('name', 128)
      .notNullable();

    //reference cohort_id
    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    
    tbl.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
