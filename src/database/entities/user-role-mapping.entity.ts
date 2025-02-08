@Entity({
    tableName: 'user_role_mappings'
})
export class UserRoleMapping extends PrimaryEntity{
    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Role)
    role!: Role;

    @Property({ default: () => new Date() })
    assignedAt!: Date; // Example of metadata property
}
