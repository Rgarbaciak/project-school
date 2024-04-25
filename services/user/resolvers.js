const User = require("./models/userModel");
const bcrypt = require("bcrypt");

const generateTokenAndSetCookie = require("./middleware/auth");

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de la récupération des utilisateurs",
          error
        );
      }
    },
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de la récupération de l'utilisateur",
          error
        );
      }
    },
    getUserByRole: async (_, { role }) => {
      try {
        const users = await User.find({ role });
        return users;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de la récupération des utilisateurs par rôle",
          error
        );
      }
    },
    getUserByLastNameAndFirstName: async (_, { lastName, firstName }) => {
      try {
        const user = await User.findOne({ lastName, firstName });
        return user;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de la récupération de l'utilisateur par nom et prénom",
          error
        );
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const user = await User.create(args);
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la création de l'utilisateur", error);
      }
    },
    updateUser: async (_, { id, ...updateData }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
          new: true,
        });
        return updatedUser;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de la mise à jour de l'utilisateur",
          error
        );
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de la suppression de l'utilisateur",
          error
        );
      }
    },
    loginUser: async (_, { username, password }, context) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Nom d'utilisateur incorrect");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect");
        }

        const token = generateTokenAndSetCookie(
          user._id,
          user.firstName,
          user.lastName,
          context.res
        );

        const response = {
          ...user.toObject(),
          token: token,
        };

        return response;
      } catch (error) {
        console.error(error);
        throw new Error(
          "Erreur lors de l'authentification de l'utilisateur",
          error
        );
      }
    },
  },
};

module.exports = resolvers;
