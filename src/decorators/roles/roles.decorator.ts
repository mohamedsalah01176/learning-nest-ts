import { Reflector } from '@nestjs/core';
import { RoleSystem } from './roles.enums.js';

export const Roles = Reflector.createDecorator<RoleSystem[]>();
