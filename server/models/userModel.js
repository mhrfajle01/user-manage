const db = require('../config/db');

class User {
    static async create(userData) {
        const { username, email, password, role } = userData;
        const [result] = await db.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role || 'user']
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async findAll() {
        const [rows] = await db.query('SELECT id, username, email, role, created_at FROM users');
        return rows;
    }

    static async update(id, userData) {
        const { username, email, role } = userData;
        await db.query(
            'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?',
            [username, email, role, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    }
}

module.exports = User;
