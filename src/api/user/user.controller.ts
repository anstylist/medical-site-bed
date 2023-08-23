import { Request, Response } from 'express';

import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
  updateUserPassword,
} from './user.service';
import { AuthRequest } from '../../auth/auth.types';
import { User } from './user.types';
import { hashPassword } from '../../auth/utils/bcrypt';

export async function getAllUserHandler(req: Request, res: Response) {
  const users = await getAllUser();

  return res.json(users);
}

export async function createUserHandler(req: Request, res: Response) {
  const data = req.body;
  try {
    const user = await createUser(data);
    return res.status(200).json({ message: "User created successfully", user })

  } catch (error) {
    return res.status(404).json({ error })
  }
}


export async function getUserHandler(req: AuthRequest, res: Response) {
  const { id } = req.user as User;
  try {

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(404).json({ error })
  }
}

export async function getUserId(req: Request, res: Response) {
  const { id } = req.params

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  return res.json(user);
}

export async function deleteUserHandler(req: AuthRequest, res: Response) {
  const user = req.user

  try {
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    await deleteUser(user.id);

    return res.status(200).json({ message: "successfully deleted" })

  } catch (error) {
    return res.status(404).json({ error })
  }
}

export async function updateUserHandler(req: AuthRequest, res: Response) {

  const user = req.user
  const data = req.body

  try {
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    await updateUser(user.id, data);
    return res.status(200).json({ message: "successfully upgraded" })

  } catch (error) {
    return res.status(500).json({ error })
  }
}

export async function updateAnyUserHandler(req: Request, res: Response) {
  const id = req.params.id
  const data = req.body

  try {

    await updateUser(id, data);
    return res.status(200).json({ message: "successfully upgraded" })

  } catch (error) {
    return res.status(500).json({ error })
  }
}

export async function changePasswordHandler(req: AuthRequest, res: Response) {

  const { newPassword } = req.body

  try {
    const user = req.user
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const hashedPassword = await hashPassword(newPassword);

    await updateUserPassword(user, hashedPassword)

    return res.status(200).json({ message: "Password successfully changed" })

  } catch (error) {
    return res.status(500).json({ error })
  }
}


