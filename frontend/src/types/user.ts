export interface FrontendCreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  organizationId: string;
  roleIds: number[];
}

export interface FrontendUpdateUserDto extends Partial<FrontendCreateUserDto> {}
