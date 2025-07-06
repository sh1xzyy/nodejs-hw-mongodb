import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/User.js';
import { randomBytes } from 'node:crypto';
import bcrypt from 'bcrypt';
import { SessionCollection } from '../db/models/Session.js';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/constants.js';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendEmail.js';

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

export const requestResetToken = async (email) => {
  const user = await UserCollection.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found!');

  const jwtSecret = getEnvVar('JWT_SECRET');
  const appDomain = getEnvVar('APP_DOMAIN');

  const token = jwt.sign({ email }, jwtSecret, { expiresIn: '5m' });

  const resetLink = `${appDomain}/reset-pwd?token=${token}`;

  await sendEmail({
    from: getEnvVar('SMTP_FROM'),
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password!</p>`,
  });

  return true;
};

export const resetPassword = async ({ password, token }) => {
  const jwtSecret = getEnvVar('JWT_SECRET');

  let email;

  try {
    const decoded = jwt.verify(token, jwtSecret);
    email = decoded.email;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw createHttpError(401, 'Token is expired or invalid.');
    }
  }

  const user = await UserCollection.findOne({ email });

  if (!user) throw createHttpError(404, 'User not found!');

  const hashPassword = await bcrypt.hash(password, 10);

  await UserCollection.updateOne({ email }, { password: hashPassword });
};
