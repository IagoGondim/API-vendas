import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found');
    }

    await usersRepository.remove(user);
  }
}

export default DeleteUserService;
