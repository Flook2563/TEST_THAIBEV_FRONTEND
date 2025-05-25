export interface UserProfileForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  profile: string;
  occupation: string;
  birth_day: string;
  sex: "Male" | "Female";
}

export interface UserProfileResponse extends UserProfileForm {
  user_id: string;
}

export interface CreateUserResponse {
  user_id: string;
}