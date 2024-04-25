const Grade = require("./models/gradeModel");

const resolvers = {
  Query: {
    grades: async () => {
      try {
        const grades = await Grade.find();
        return grades;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération des notes", error);
      }
    },
    grade: async (_, { id }) => {
      try {
        const grade = await Grade.findById(id);
        return grade;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération de la note", error);
      }
    },

    gradesByUserId: async (_, { userId }) => {
      try {
        const grades = await Grade.find({ studentId: userId });
        return grades;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de la récupération des notes par userId",
          error
        );
      }
    },
  },
  Mutation: {
    createGrade: async (_, { studentId, date, examName, score }) => {
      try {
        const newGrade = await Grade.create({
          studentId,
          date,
          examName,
          score,
        });
        return newGrade;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la création de la note", error);
      }
    },
    updateGrade: async (_, { id, input }) => {
      try {
        const updatedGrade = await Grade.findByIdAndUpdate(id, input, {
          new: true,
        });
        return updatedGrade;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la mise à jour de la note", error);
      }
    },
    deleteGrade: async (_, { id }) => {
      try {
        const deletedGrade = await Grade.findByIdAndDelete(id);
        return deletedGrade;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la suppression de la note", error);
      }
    },
  },
};

module.exports = resolvers;
