import { DataSource } from "typeorm";
import type { DataSourceOptions } from "typeorm";
import { UserDetails } from "../users/entities/userDetails.entity.js";
import { Review } from "../reviews/entities/review.entity.js";
import { Product } from "../products/entities/product.entity.js";
import { User } from "../users/entities/users.entity.js";
import { config } from "dotenv";

config({ path: ".env" });

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, Product, Review, UserDetails],
  migrations: ["src/db/migration/*.ts"],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;