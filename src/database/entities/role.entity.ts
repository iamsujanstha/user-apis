@Entity({
    tableName: 'roles'
})
export class RoleEntity extends PrimaryEntity{
    @Property()
    name!: string;

    @Property()
    description!: string;

    @OneToMany(() => UserRoleMapping, (mapping) => mapping.role)
    userMappings = new Collection<UserRoleMapping>(this); // Relationship to mapping table
}
