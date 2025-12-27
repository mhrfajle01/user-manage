const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    console.log('--- Database Diagnostic Tool ---');
    console.log(`Attempting to connect to host: ${process.env.DB_HOST}, user: ${process.env.DB_USER}`);

    try {
        // 1. Test basic connection (no specific DB)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
        console.log('✅ Connection to MySQL server successful!');

        // 2. Check if database exists
        const [dbs] = await connection.query('SHOW DATABASES LIKE ?', [process.env.DB_NAME]);
        if (dbs.length === 0) {
            console.error(`❌ Database '${process.env.DB_NAME}' does NOT exist.`);
            console.log(`   -> Run the commands in 'server/schema.sql' to create it.`);
            await connection.end();
            return;
        }
        console.log(`✅ Database '${process.env.DB_NAME}' found.`);

        // 3. Connect to the specific database
        await connection.changeUser({ database: process.env.DB_NAME });

        // 4. Check for 'users' table
        const [tables] = await connection.query('SHOW TABLES LIKE "users"');
        if (tables.length === 0) {
            console.error('❌ Table "users" does NOT exist.');
            console.log(`   -> Run the commands in 'server/schema.sql' to create it.`);
        } else {
            console.log('✅ Table "users" found.');
        }

        await connection.end();
    } catch (err) {
        console.error('❌ Connection Failed:');
        console.error(err.message);
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('\n💡 Tip: Check your DB_PASSWORD in server/.env');
        }
    }
    console.log('--------------------------------');
}

testConnection();
