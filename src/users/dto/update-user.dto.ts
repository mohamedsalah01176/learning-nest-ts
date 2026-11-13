import { PartialType } from "@nestjs/swagger";
import { CreateUserDTO } from "./create-user.dto.js";

export class UpdateUserDTO extends PartialType(CreateUserDTO){}