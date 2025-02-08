@Entity({
    tableName: 'offices'
})
export class Office extends PrimaryEntity{
    @Property()
    name!: string;

    @Property()
    contact!: string;

    @Property()
    address!: string;

    @Property()
    pan!: string;

    @OneToMany(() => UserOfficeMapping, (mapping) => mapping.office)
    userMappings = new Collection<UserOfficeMapping>(this); // Relationship to mapping table
}
