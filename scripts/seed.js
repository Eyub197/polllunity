const { db } = require("@vercel/postgres")

const createUser = async (client) => {
  try {
    const createUsersTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        type VARCHAR(20),
        user_name VARCHAR(30) UNIQUE NOT NULL,
        first_name VARCHAR(20),
        last_name VARCHAR(20),
        email VARCHAR(40) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        has_voted BOOLEAN DEFAULT false,
        image VARCHAR,
        groups INT[]
      )
    `
    console.log(`Create "users" table`)

    return createUsersTable;
  } catch (error) {
    console.error(`Creating failed`, error)
    throw error
  }
}

const createPoll = async (client) => {
  try {
    const createPoolTable = await client.sql`
      CREATE TABLE IF NOT EXISTS pool (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        description VARCHAR(250),
        start_time TIMESTAMP,
        end_time TIMESTAMP NOT NULL,
        type VARCHAR(25),
        voted_people_count INT DEFAULT 0,
        scope VARCHAR(20),
        creator_user_id INT REFERENCES users(id)
      )
    `
    console.log(`Create "pool" table`)

    return createPoolTable;
  } catch (error) {
    console.error(`Creating failed`, error)
    throw error
  }
};

const createGroup = async (client) => {
  try {
    const createGroupTable = await client.sql`
      CREATE TABLE IF NOT EXISTS user_group (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        creator_user_id INT REFERENCES users(id),
        members INT REFERENCES users(id),
        members_count INT DEFAULT 0
      )
    `
    console.log(`Create "group" table`)

    return createGroupTable;
  } catch (error) {
    console.error(`Creating failed`, error)
    throw error
  }
}

const addForeignKey = async (client) => {
  try {
    const checkConstraintQuery = await client.sql`
      SELECT constraint_name
      FROM information_schema.table_constraints
      WHERE table_name = 'user_group' AND constraint_name = 'fk_creator_user'
    `

    const constraintExists = checkConstraintQuery.rows.length > 0

    if (!constraintExists) {
      const addForeignKeyConstraint = await client.sql`
        ALTER TABLE user_group ADD CONSTRAINT fk_creator_user FOREIGN KEY (creator_user_id) REFERENCES users(id);
      `
      console.log(`Add foreign key constraints`)

      return addForeignKeyConstraint
    } else {
      console.log(`Foreign key constraints already exist`)
      return null
    }
  } catch (error) {
    console.error(`Adding foreign key constraints failed`, error)
    throw error
  }
}

const createOption = async (client) => {
  try {
    const createOptionTable = await client.sql`
      CREATE TABLE IF NOT EXISTS option (
        id SERIAL PRIMARY KEY,
        image VARCHAR,
        name VARCHAR(20) NOT NULL,
        description VARCHAR(250),
        answers VARCHAR[],
        correct_answers VARCHAR[],
        chosen_people_count INT DEFAULT 0,
        poll_id INT REFERENCES pool(id)
      )
    `
    console.log(`Create "option" table`)

    return createOptionTable
  } catch (error) {
    console.error(`Creating failed`, error)
    throw error
  }
}

const main = async () => {
  const client = await db.connect()

  try {

    await createUser(client)
    await createPoll(client)
    await createGroup(client)
    await addForeignKey(client)
    await createOption(client)

  } finally {

    await client.end()
  }
}

main().catch((err) => {
  console.error("An error occurred while attempting to create db", err)
})
