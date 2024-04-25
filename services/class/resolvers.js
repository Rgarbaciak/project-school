const Class = require("./models/classModel");

const resolvers = {
  Query: {
    classes: async () => {
      try {
        const classes = await Class.find();
        return classes;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération des classes", error);
      }
    },
    classesById: async (_, { id }) => {
      try {
        const classe = await Class.findById(id);
        return classe;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération de la classe", error);
      }
    },
    getClassByUserId: async (_, { userId }) => {
      try {
        console.log(userId);
        const classe = await Class.findOne({ studentIds: userId });

        return classe;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de la récupération de la classe par l'ID de l'utilisateur",
          error
        );
      }
    },
  },
  Mutation: {
    createClass: async (_, { name, professorId }) => {
      try {
        const newClass = await Class.create({ name, professor: professorId });
        console.log(newClass);
        return newClass;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la création de la classe", error);
      }
    },
    updateClass: async (_, { id, ...updateData }) => {
      try {
        const updatedClass = await Class.findByIdAndUpdate(id, updateData, {
          new: true,
        });
        return updatedClass;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la mise à jour de la classe", error);
      }
    },
    deleteClass: async (_, { id }) => {
      try {
        const deletedClass = await Class.findByIdAndDelete(id);
        return deletedClass;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la suppression de la classe", error);
      }
    },
    addStudentsToClass: async (_, { classId, studentIds }) => {
      try {
        const classe = await Class.findById(classId);
        if (!classe) {
          throw new Error("Classe non trouvée");
        }
        classe.studentIds.push(...studentIds);
        await classe.save();
        return classe;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de l'ajout d'étudiants à la classe",
          error
        );
      }
    },
  },
};

module.exports = resolvers;
