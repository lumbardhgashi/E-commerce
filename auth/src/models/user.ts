import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Password } from "../services/password";
import { IUser } from "@aaecomm/common";
import { sequelize } from "../sequelize";

interface UserAttributes extends Optional<IUser, "version" | "password"> {}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt" | "role"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ["user"],
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

User.beforeSave(async (user: User) => {
  if (user.changed("password")) {
    const hashedPassword = await Password.toHash(user.password);
    user.password = hashedPassword;
  }
});

// Synchronize the model with the database
User.sync().then(async () => {
  const rowCount = await User.count();

  if (rowCount === 0) {
    // Create the user when the table is empty
    const newUser = await User.create({
      username: "admin",
      email: "admin@gmail.com",
      password: "password",
      role: ["user", "admin"],
    });
    console.log("Admin user created:", newUser.toJSON());
  }
});

export { User };
