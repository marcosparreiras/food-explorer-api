exports.up = (knex) =>
    knex.schema.createTable('meals', (table) => {
        table.increments('id');
        table.text('image');
        table.text('name').notNullable();
        table.text('description').notNullable();
        table.float('price').notNullable();
        table
            .enu('category', ['meal', 'desert', 'drink'], {
                useNative: true,
                enumName: 'foo_type',
            })
            .notNullable();
        table
            .integer('user_id')
            .references('id')
            .inTable('users')
            .notNullable();
        table.timestamp('created_at').default(knex.fn.now());
        table.timestamp('updated_at').default(knex.fn.now());
    });

exports.down = (knex) => knex.schema.dropTable('meals');
