import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/User.js';
import { randomBytes } from 'node:crypto';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/Session.js';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/constants.js';

export const findSession = (query) => SessionCollection.findOne(query);

export const findUser = (query) => UserCollection.findOne(query);

const createSession = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + accessTokenLifeTime,
  refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
});

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });

  if (user) throw createHttpError(409, 'Email in use');

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) throw createHttpError(401, 'Email or password invalid');

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw createHttpError(401, 'Email or password invalid');

  const session = createSession();

  return SessionCollection.create({
    userId: user._id,
    ...session,
  });
};

export const refreshUser = async ({ refreshToken, sessionId }) => {
  const oldSession = await findSession({ refreshToken, _id: sessionId });
  if (!oldSession) throw createHttpError(401, 'Session not found');

  if (oldSession.refreshTokenValidUntil < Date.now())
    throw createHttpError(401, 'Session token expired');

  await SessionCollection.findOneAndDelete({ _id: oldSession._id });

  const session = createSession();

  return SessionCollection.create({
    userId: oldSession.userId,
    ...session,
  });
};

export const logoutUser = async (_id) => {
  await SessionCollection.findOneAndDelete({ _id });
};
