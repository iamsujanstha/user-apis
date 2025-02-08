@Entity({
    tableName: 'user_office_mappings'
})
export class UserOfficeMappingEntity extends PrimaryEntity{
    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Office)
    office!: Office;

    @Property({ default: () => new Date() })
    assignedAt!: Date; // Example of metadata property
}
