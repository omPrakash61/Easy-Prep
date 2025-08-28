import { mysqlTable, serial, varchar, int, json, boolean } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  subscriptionId: int('subscription_id'),
});

export const courseTable = mysqlTable('courses', {
  id: serial('id').primaryKey(),
  cid: varchar('cid', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 100 }),
  description: varchar('description', { length: 1000 }),
  noOfChapters: int('no_of_chapters').notNull().default(1),
  includeVideo: boolean('include_video').default(false),
  level: varchar('level', { length: 50 }).notNull(),
  category: varchar('category', { length: 50 }),
  courseJson: json('course_json'),
  bannerImageUrl: varchar('bannerImageUrl', { length : 1000 }),
  courseContent: json('courseContent').default({}),
  userEmail: varchar('user_email', { length: 100 }).notNull().references(() => usersTable.email),
});

export const enrolCourseTable = mysqlTable('enrollCourse', {
  id: serial('id').primaryKey(),
  cid: varchar('cid', { length: 100 }).references(() => courseTable.cid),
  userEmail: varchar('userEmail', { length: 100 }).references(() => usersTable.email),
  completeChapters: json('completeChapters').default({})
})