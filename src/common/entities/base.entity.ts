export class BaseEntity {
    @PrimaryKey({name: 'id', autoIncrement: true})
    id!: number;

    @Property({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    createdAt!: Date;

    @Property({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date;
}