import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Track, TrackDocument } from './schemas/track.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    console.log('AUDIO1', audio);
    console.log('IMAGE1', picture);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);

    console.log({ picturePath, audioPath });

    return await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    return await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
  }

  async search(namePath: string): Promise<Track[]> {
    return await this.trackModel.find({
      name: { $regex: new RegExp(namePath, 'i') },
    });
  }

  async getOne(id: ObjectId): Promise<Track> {
    return await this.trackModel.findById(id).populate('comments');
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    return (await this.trackModel.findByIdAndDelete(id))._id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    console.log({ track });
    const comment = await this.commentModel.create({ ...dto });
    console.log({ comment });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }

  async addListen(id: ObjectId): Promise<void> {
    const track = await this.trackModel.findById(id);
    console.log(track);
    track.listens++;
    track.save();
  }
}
