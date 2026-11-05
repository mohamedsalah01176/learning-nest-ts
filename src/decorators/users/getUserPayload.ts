import {createParamDecorator , ExecutionContext} from "@nestjs/common"

export const getUserPayload= createParamDecorator((data,context:ExecutionContext)=>{

    const request=context.switchToHttp().getRequest();
    return request.user
})