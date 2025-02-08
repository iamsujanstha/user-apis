export interface CreateAddressDto {
   @IsString()
    @IsNotEmpty()
street: string;
   city: string;
   state: string;
   zip: string;
   
}