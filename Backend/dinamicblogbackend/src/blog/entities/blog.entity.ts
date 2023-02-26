import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'profile' })
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  first_name: string;

  @Column({ length: 50, nullable: false })
  last_name: string;

  @Column({ length: 50, nullable: false })
  email: string;

  @Column({ type: 'longblob', nullable: true })
  avatar: Buffer;

  @OneToMany(() => LoginEntity, (login) => login.profile)
  @JoinColumn({ name: 'profile_id' })
  logins: LoginEntity[];

  @OneToMany(() => BlogEntity, (blog) => blog.profile)
  @JoinColumn({ name: 'profile_id' })
  blogs: BlogEntity[];
}

@Entity({ name: 'login' })
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  user: string;

  @Column({ length: 50, nullable: false })
  password: string;

  @Column({ name: 'profile_id', nullable: false, unique: true })
  profileId: number;

  @OneToMany(() => DocumentEntity, (document) => document.blog)
  @JoinColumn({ name: 'blog_id' })
  documents: DocumentEntity[];

  @ManyToOne(() => ProfileEntity, (profile) => profile.logins)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}

@Entity({ name: 'blog' })
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'longblob', nullable: true })
  image: Buffer;

  @Column({ name: 'profile_id', nullable: false })
  profileId: number;

  @OneToMany(() => DocumentEntity, (document) => document.blog)
  @JoinColumn({ name: 'blog_id' })
  documents: DocumentEntity[];

  @ManyToOne(() => ProfileEntity, (profile) => profile.blogs)
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}

@Entity({ name: 'document' })
export class DocumentEntity {
  @PrimaryGeneratedColumn({ name: 'document_id' })
  id: number;

  @Column({ length: 50, nullable: false })
  html: string;

  @Column({ type: 'longblob', nullable: true })
  image: Buffer;

  @Column({ name: 'blog_id', nullable: false })
  blogId: number;

  @ManyToOne(() => BlogEntity, (blog) => blog.documents)
  @JoinColumn({ name: 'blog_id' })
  blog: BlogEntity;
}