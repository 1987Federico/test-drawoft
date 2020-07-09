class userRepository {
    constructor(dao) {
      this.dao = dao
    };
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        lastName TEXT, 
        brithday TEXT,
        dni INTEGER)`
      return this.dao.run(sql)
    };

    insert(body) {
        return this.dao.run(
          'INSERT INTO user (name,lastName,brithday,dni) VALUES (?,?,?,?)',
          body)
    };

    update(body) {
        const {name,lastName,brithday,dni,id } = body;
        return this.dao.run(
          `UPDATE user SET name = ? WHERE id = ?`,
          [name, id]
        )
    };

    delete(id) {
        return this.dao.run(
          `DELETE FROM user WHERE id = ?`,
          [id]
        )
    };

    getById(id) {
        return this.dao.get(
          `SELECT * FROM user WHERE id = ?`,
          [id])
    };

    getAll() {
        return this.dao.all(`SELECT * FROM user`)
    };

    
    getFilter(params){
        if (params.name){
            if(params.brithdayLess && params.brithdayHigher) {
                if (params.brithdaySince && params.brithdayUntil){
                    return this.getAll()
                } else {
                    return this.getNamexBrithday(params)
                }
            } else {
                if (params.brithdaySince && params.brithdayUntil){
                    return this.getNamexBetwenBrithday(params)
                } else {
                    return this.getName(params.name)
                }
            } 
        } else {
            if(params.brithdayLess && params.brithdayHigher) {
                if (params.brithdaySince && params.brithdayUntil){
                    return this.getAll() 
                } else {
                    return this.getBrithday(params);
                }
            } else {
                if (params.brithdaySince && params.brithdayUntil) {
                    return this.getBetwenBrithday(params)
                } else {
                    return this.getAll() 
                }
                
            }

        }

    }
    
    getName(name){
        name =`%${name}%`
        return this.dao.all(
            `SELECT * FROM user WHERE lastName LIKE (?) OR name LIKE (?) `,
            name)
    };

    getBrithday(params){
        const {brithdayLess,brithdayHigher} = params
        return this.dao.all(
            `SELECT * FROM user WHERE brithday < ? OR brithday > ?`,
            [brithdayLess,brithdayHigher]
        )
    };

    getBetwenBrithday(params){
        const {brithdaySince,brithdayUntil,name} = params;
        return this.dao.all(
            `SELECT * FROM user WHERE brithday BETWEEN ? AND ?`,
            [brithdaySince,brithdayUntil,name]
        )
    };

    getNamexBetwenBrithday(params){
        const {brithdaySince,brithdayUntil,name} = params;
        return this.dao.all(
            `SELECT * FROM user WHERE brithday BETWEEN ? AND ? OR lastName LIKE (?) OR name LIKE (?) `,
            [brithdaySince,brithdayUntil,name]
        )
    }

    getNamexBrithday(params){
        const {brithdayLess,brithdayHigher,name} = params;
        return this.dao.all(
            `SELECT * FROM user WHERE brithday < ? OR brithday > ? OR lastName LIKE (?) OR name LIKE (?) `,
            [brithdayLess,brithdayHigher,name]
        )
    };
    




  };
  
  module.exports = userRepository;