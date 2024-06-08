import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { EErrorMessages } from 'src/enums/error-messages.enum';
import { UpdateQuery } from 'mongoose';
import { InjectModel } from 'src/transformers/model.transformer';

import { MongooseModel } from 'src/interfaces/mongoose.interface';
import { IAuthUser } from '../auth/interface/auth-user.interface';

@Injectable()
export class UserService {
  selectUserFields;
  constructor(
    @InjectModel(User) private readonly userModel: MongooseModel<User>,
  ) {
    this.selectUserFields = {
      _id: true,
      email: true,
      fullName: true,
    };
  }

  async update(_id: string, body: UpdateQuery<IAuthUser>) {
    const user = await this.userModel.findOne({ _id: _id });

    if (!user) {
      throw new HttpException(
        EErrorMessages.USER_NOT_EXISTS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.userModel.findOneAndUpdate({ _id: user._id }, body, {
      new: true,
    });
  }
}
