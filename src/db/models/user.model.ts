import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import argon2 from "argon2";

//All Possible Attributes for the User Model
interface UserAttributes {
  user_id: number;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

//Input fields required for User creation
export interface UserInput extends Optional<UserAttributes, "user_id"> {}

//Attributes of the User Model returned from query
export interface UserOutput extends Required<UserAttributes> {
  comparePassword: (password: string) => Promise<boolean>;
}

function createUserModel(sequelizeConn: any) {
  class User
    extends Model<UserAttributes, UserInput>
    implements UserAttributes
  {
    public user_id!: number;
    public name!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public async comparePassword(password: string) {
      return await argon2.verify(this.password, password);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize: sequelizeConn,
      tableName: "users",
      initialAutoIncrement: "100",
    }
  );
  //pre save hook to hash password
  User.beforeCreate(async (user, _) => {
    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword;
  });

  //instance method to compare password
  User.prototype.comparePassword = async function (password: string) {
    return await argon2.verify(this.password, password);
  };

  return User;
}

export default createUserModel;
