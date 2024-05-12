import { Address } from "./address.dto";
import { Role } from "./roles.dto";

export class User {
    id!: number;

    firstname!: string;

    lastname!: string;

    email!: string;

    hash?: string;

    access_token?: string;

    phone!: string;

    roles?: Role[];

    addresses?: Address[];

    email_verification_token?: string;

    status!: boolean
}