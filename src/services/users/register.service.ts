import { UsersRepository } from "@/repositories/users.repository";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

interface RegisterServiceRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterServiceResponse {
  user: User;
}

export class RegisterService {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const password_hash = await bcrypt.hash(password, 6);

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
