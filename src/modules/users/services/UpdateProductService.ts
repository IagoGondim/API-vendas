import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('user not found');
    }

    const emailExists = await usersRepository.findByName(name);

    if (emailExists && email !== user.email) {
      throw new AppError('Email addres already used');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
