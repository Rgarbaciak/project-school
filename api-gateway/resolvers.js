const axios = require("axios");

const USER_SERVICE_URL = "http://user-service:3003/graphql";
const GRADE_SERVICE_URL = "http://grade-service:3002/graphql";
const CLASS_SERVICE_URL = "http://class-service:3001/graphql";
const COURSE_SERVICE_URL = "http://course-service:3004/graphql";

const resolvers = {
  Query: {
    studentsInClass: async (_, { userId }) => {
      try {
        const classResponse = await axios.post(CLASS_SERVICE_URL, {
          query: `
            query ClassByUserId($userId: ID!) {
              getClassByUserId(userId: $userId) {
                _id
              }
            }
          `,
          variables: { userId: userId },
        });

        const classId = classResponse.data.data.getClassByUserId._id;

        const classDetailsResponse = await axios.post(CLASS_SERVICE_URL, {
          query: `
            query ClassDetails($classId: ID!) {
              classesById(id: $classId) {
                studentIds
              }
            }
          `,
          variables: { classId },
        });

        const studentIds = classDetailsResponse.data.data.classesById;

        const studentsPromises = studentIds.studentIds.map(async (userId) => {
          const userResponse = await axios.post(USER_SERVICE_URL, {
            query: `
              query user($userId: ID!) {
                user(id: $userId) {
                  firstName
                  lastName
                }
              }
            `,
            variables: { userId: userId },
          });

          const userData = userResponse.data.data.user;
          return {
            _id: userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
          };
        });

        const students = await Promise.all(studentsPromises);
        return students;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des étudiants dans la classe:",
          error
        );
        throw new Error(
          "Erreur lors de la récupération des étudiants dans la classe"
        );
      }
    },
    courseByClassId: async (_, { userId }) => {
      try {
        const classResponse = await axios.post(CLASS_SERVICE_URL, {
          query: `
            query ClassByUserId($userId: ID!) {
              getClassByUserId(userId: $userId) {
                _id
              }
            }
          `,
          variables: { userId: userId },
        });

        const classId = classResponse.data.data.getClassByUserId._id;

        const courseResponse = await axios.post(COURSE_SERVICE_URL, {
          query: `
            query CourseByClassId($classId: ID!) {
              courseByClassId(classId: $classId) {
                _id
                name
                professorId
                schedule
                room
              }
            }
          `,
          variables: { classId: classId },
        });
        const courses = courseResponse.data.data.courseByClassId;

        return courses;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du cours par ID de classe:",
          error
        );
        throw new Error(
          "Erreur lors de la récupération du cours par ID de classe"
        );
      }
    },
  },
  Mutation: {
    addGradeToStudent: async (
      _,
      { firstName, lastName, examName, score, date }
    ) => {
      try {
        const userResponse = await axios.post(USER_SERVICE_URL, {
          query: `
              query ($lastName: String!, $firstName: String!) {
                getUserByLastNameAndFirstName(lastName: $lastName, firstName: $firstName) {
                  _id
                  role
                }
              }
            `,
          variables: { lastName, firstName },
        });

        const user = userResponse.data.data.getUserByLastNameAndFirstName;
        if (user.role !== "STUDENT") {
          throw new Error("L'utilisateur n'est pas un étudiant.");
        }

        const gradeResponse = await axios.post(GRADE_SERVICE_URL, {
          query: `
              mutation ($studentId: ID!, $examName: String!, $score: String!, $date: String!) {
                createGrade(studentId: $studentId, examName: $examName, score: $score, date: $date) {
                  _id
                  studentId
                  examName
                  score
                  date
                }
              }
            `,
          variables: {
            studentId: user._id,
            examName,
            score,
            date,
          },
        });

        const grade = gradeResponse.data.data.createGrade;
        return grade;
      } catch (error) {
        console.error("Erreur lors de l'ajout de la note à l'étudiant:", error);
        throw new Error("Erreur lors de l'ajout de la note à l'étudiant");
      }
    },
  },
};

module.exports = resolvers;
