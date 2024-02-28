const pool = require('../services/db');

const SQLSTATEMENT = `
    CREATE SCHEMA IF NOT EXISTS neggardevelopment;

    DROP TABLE IF EXISTS member;
    DROP TABLE IF EXISTS weighttracker;
    DROP TABLE IF EXISTS programme;
    DROP TABLE IF EXISTS day;
    DROP TABLE IF EXISTS exercise;
    DROP TABLE IF EXISTS workoutlog;
    DROP TABLE IF EXISTS workoutlogset;
    DROP TABLE IF EXISTS superset;

    CREATE TABLE member (
        member_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        active_programme_id INT,
        admin BOOLEAN NOT NULL DEFAULT FALSE
    );

    CREATE TABLE weighttracker (
        weighttracker_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        member_id INT NOT NULL,
        weight INT NOT NULL,
        created_on TIMESTAMP NOT NULL
    );

    CREATE TABLE programme (
        programme_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        member_id INT NOT NULL
    );

    CREATE TABLE day (
        day_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        programme_id INT NOT NULL,
        exercise_id INT,
        superset_id INT,
        day INT NOT NULL,
        workout_order INT NOT NULL,
        sets INT NOT NULL,
        reps TEXT NOT NULL,
        target_weight INT NOT NULL
    );

    CREATE TABLE exercise (
        exercise_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        name TEXT NOT NULL
    );

    CREATE TABLE workoutlog (
        workoutlog_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        member_id INT NOT NULL,
        exercise_id INT NOT NULL,
        weight TEXT NOT NULL,
        reps TEXT NOT NULL,
        created_on TIMESTAMP NOT NULL
    );

    CREATE TABLE workoutlogset (
        workoutlogset_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        workoutlog_id INT NOT NULL,
        weight TEXT NOT NULL,
        reps TEXT NOT NULL
    );

    CREATE TABLE superset (
        superset_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        exercise1_id INT NOT NULL,
        exercise2_id INT NOT NULL
    );
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully");
    }
    process.exit();
});
