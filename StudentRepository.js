    
    const path = require('path');
    const Database = require('better-sqlite3');

    const DBPath = path.resolve(__dirname, './resources/db/students_db.db');
    let mySQLDB = new Database(DBPath);

    const insertStmt = mySQLDB.prepare("INSERT INTO students(first_name, last_name, email, age, major) VALUES (?, ?, ?, ?, ?)");
    const updateStmt = mySQLDB.prepare("UPDATE students SET first_name=?, last_name=?, email=?, age=?, major=? WHERE id = ?");
    const selectStmt =  mySQLDB.prepare("SELECT * FROM students WHERE id=?");
    const deleteStmt =  mySQLDB.prepare("DELETE FROM students WHERE id=?");
    const selectAllStmt =  mySQLDB.prepare("SELECT * FROM students");
     
    function closeDatabase() {
        if (mySQLDB) {
            mySQLDB.close();
            console.log("SQLite database connection closed successfully!");
        }
        
    }

    function addStudentInfo(id, firstName, lastName, email, age, major) {
        const info = insertStmt.run(firstName, lastName, email, age, major);
        if (info.lastInsertRowid > 0) {
            console.log("Student info added successfully!");
        }
        return {id: info.lastInsertRowid, changes: info.changes};  
    }

    function updateStudentInfo(id, firstName, lastName, email, age, major) {
        const info = updateStmt.run(firstName, lastName, email, age, major, id);
        if (info.changes > 0) {
            console.log("Student info updated successfully!");
        }  
        return {id, changes: info.changes};
    }

    function getStudentInfo(id){
        const student = selectStmt.get(id);
        return(student || null);
    }

    function deleteStudentInfo(id){
        const info = deleteStmt.run(id);
        if (info.changes > 0) {
            console.log("Student info deleted successfully!");
        }
        return {id, changes: info.changes};
    }

    function getAllStudents() {
        const students = selectAllStmt.all();
        return(students);
    }

    // const stud = getStudentInfo(6);
    // console.log(stud);

    // const students = getAllStudents();
    // console.log(students);
    //closeDatabase();

module.exports = { addStudentInfo, updateStudentInfo, getStudentInfo, getAllStudents, deleteStudentInfo}
