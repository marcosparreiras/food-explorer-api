exports.up = (knex) =>
    knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.text('name').notNullable();
        table.text('password').notNullable();
        table.text('email').notNullable();
        table
            .enu('role', ['admin', 'customer'], {
                useNative: true,
                enumName: 'foo_type',
            })
            .default('customer');
        table.timestamp('created_at').default(knex.fn.now());
        table.timestamp('updated_at').default(knex.fn.now());
    });

exports.down = (knex) => knex.schema.dropTable('users');
