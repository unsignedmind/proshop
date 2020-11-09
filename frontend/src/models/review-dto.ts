import { UserDTO } from './user-dto';

// @todo add timestamp fields
export interface ReviewDTO {
	name: string;
	rating: number;
	comment: string;
	user: UserDTO;
}
