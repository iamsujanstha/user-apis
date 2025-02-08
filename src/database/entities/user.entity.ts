@Entity({
    tableName: 'users'
})
export class UserEntity extends BaseEntity{
    @Property({fieldName: 'name', type: 'string'})
    name!: string;
    
    @Property({fieldName: 'email', type: 'string'})
    email!: string;
    
    @Property({fieldName: 'password', type: 'string'})
    password!: string;
    
}