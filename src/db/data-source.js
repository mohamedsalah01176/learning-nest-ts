import { DataSource } from "typeorm";
import { UserDetails } from "../users/entities/userDetails.entity.js";
import { Review } from "../reviews/entities/review.entity.js";
import { Product } from "../products/entities/product.entity.js";
import { User } from "../users/entities/users.entity.js";
import { config } from "dotenv";
config({ path: '.env' });
export const dataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [User, Product, Review, UserDetails],
    migrations: ["dist/migrations/*.ts"]
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
//# sourceMappingURL=data-source.js.map