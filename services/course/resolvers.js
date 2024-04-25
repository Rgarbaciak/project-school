const Course = require("./models/courseModel");

const resolvers = {
  Query: {
    courses: async () => {
      try {
        const courses = await Course.find();
        return courses;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération des cours", error);
      }
    },
    course: async (_, { id }) => {
      try {
        const course = await Course.findById(id);
        return course;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération du cours", error);
      }
    },
    courseByClassId: async (_, { classId }) => {
      try {
        const course = await Course.find({ classId });
        return course;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de la récupération du cours par identifiant de classe",
          error
        );
      }
    },
  },
  Mutation: {
    createCourse: async (_, { name, professorId, schedule, room, classId }) => {
      try {
        const newCourse = await Course.create({
          name,
          professorId,
          schedule,
          room,
          classId,
        });
        return newCourse;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la création du cours", error);
      }
    },
    updateCourse: async (_, { id, ...updateData }) => {
      try {
        const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
          new: true,
        });
        return updatedCourse;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la mise à jour du cours", error);
      }
    },
    deleteCourse: async (_, { id }) => {
      try {
        const deletedCourse = await Course.findByIdAndDelete(id);
        return deletedCourse;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la suppression du cours", error);
      }
    },
  },
};

module.exports = resolvers;
