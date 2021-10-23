import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { UserDto } from './dto/User.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(userDto: UserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: ObjectId) {
    return await this.userModel.findById(id).exec();
  }

  async update(id: ObjectId, userDto: UserDto) {
    await this.userModel.findByIdAndUpdate(id, userDto);
    return this.userModel.findById(id).exec();
  }

  async remove(id: ObjectId) {
    return await this.userModel.findByIdAndDelete({ "_id": id }).exec();
  }
}
