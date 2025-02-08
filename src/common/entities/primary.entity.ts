import { PrimaryKey } from '@mikro-orm/core';

export class PrimaryEntity {
    @PrimaryKey({ name: 'id', autoincrement: true })
    id!: number;
}