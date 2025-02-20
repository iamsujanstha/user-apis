import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_ROUTE = 'isPublic';
export const IS_PROTECTED_ROUTE = 'isProtected';
export const Public = () => SetMetadata(IS_PUBLIC_ROUTE, true);
export const Protected = () => SetMetadata(IS_PROTECTED_ROUTE, true);
