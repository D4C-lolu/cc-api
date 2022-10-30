import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "../config";

//All Possible Attributes for the Account Model
interface AccountAttributes {
  account_number: number;
  user_name: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

//Input fields required for Account creation
export interface AccountInput
  extends Optional<AccountAttributes, "account_number"> {}

//Attributes of the Account Model returned from query
export interface AccountOutput extends Required<AccountAttributes> {}

function createAccountModel(sequelizeConn: any) {
  class Account
    extends Model<AccountAttributes, AccountInput>
    implements AccountAttributes
  {
    public account_number!: number;
    public user_name!: string;
    public balance!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  Account.init(
    {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        validate: {
          notEmpty: true,
        },
      },
      account_number: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize: sequelizeConn,
      tableName: "accounts",
      initialAutoIncrement: "1000000",
    }
  );
  return Account;
}
export default createAccountModel;
