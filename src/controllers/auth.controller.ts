import { Request, response, Response } from 'express';
import { generateAccessToken, isTokenOkey } from '../utils/token';
import { cache } from '../utils/cache';
import dayjs from 'dayjs';
import { User } from './../models/UserModel';
import { json } from 'stream/consumers';
import { sha256, sha224 } from 'js-sha256';
//Tarea verificar que el token, lo haya realizado nosotros

export const loginMethod = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || user.password !== sha256(password)) {
        return res.status(401).json({ message: "Incorrect username or password" });
    }

    const userId = user._id.toString();
    const accessToken = generateAccessToken(userId);

    // Cache con TTL de 15 minutos
    cache.set(userId, accessToken, 60 * 15);

    return res.status(200).json({
        message: "Login successful",
        accessToken
    });
};

export const getTimeToken = (req: Request, res: Response) => {
    const { userId } = req.params;

    const token = cache.get(userId); // Recuperación de token
    if (!token) {
        return res.status(404).json({
            message: "Token not found",
        });
    }

    // Verificar si el token es válido
    if (!isTokenOkey(token)) {
        return res.status(401).json({
            message: "Token not valid",
        });
    }

    const ttl = cache.getTtl(userId); // Tiempo de vida
    if (!ttl) {
        return res.status(404).json({
            message: "Token TTL not found",
        });
    }

    const now = Date.now();
    const timeToLife = Math.floor((ttl - now) / 1000); // Segundos
    const expTime = dayjs(ttl).format('HH:mm:ss'); // Formato de fecha

    return res.status(200).json({
        timeToLife,
        expTime
    });
};

export const verifyToken = (req: Request, res: Response) => {
    const { token } = req.params;

    if (!isTokenOkey(token)) {
        return res.status(401).json({
            message: "Token not valid",
        });
    }

    return res.status(200).json({
        message: "Token valid",
    });
};

export const updateToken = (req: Request, res: Response) => {
    const { userId } = req.params;

    // Obtener el TTL actual del token desde la caché
    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404).json({
            message: "Token TTL not found",
        });
    }

    // Establecer un nuevo TTL (15 minutos más)
    const newTimeToken: number = 60 * 15; // 15 minutos en segundos

    // Actualizar el TTL del token
    cache.ttl(userId, newTimeToken);

    // Responder al cliente
    return res.status(200).json({
        message: "Token updated",
    });
};

export const getAllUsers = async (req: Request, res: Response) => {
    const userList = await User.find();
    return res.json({ userList });
}

export const getAllUsersByEmail = async (req: Request, res: Response) => {
    const { userEmail } = req.params;
    
    const serch = new RegExp(userEmail, 'i'); // 'i' search case insensitive

    const userListByEmail = await User.find({ email: serch });
    return res.json({ userListByEmail });
}

export const saveUser = async (req: Request, res: Response) => {
    const { username, email, password, role, firstName, lastName } = req.body;
    //Encriptacion de contraseña
    const pass = sha256(password);
    //Preguntar como uno puede saver cual libreria usar y como saber que es segura

    const newuser = new User({
        firstName, 
        lastName,
        username, 
        password: pass, 
        role, 
        email
    });

    const userSaved = await newuser.save();
    return res.status(201).json({
        message: "User created successfully", User: userSaved})
}

export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { username, email, password, role, firstName, lastName } = req.body;
    
    const user = await User.findById(userId);
    if (!user){
        return res.status(404).json({ message: "User not found"});
    }

    const userEmail = await User.findOne({ email });
    if(userEmail&&userEmail.id!==user.id){
        return res.status(426).json({ message: "El correo ya existe" })
    }

    user.password = password != null ? sha256(password) : user.password;
    user.email = email != null ? email : user.email;
    user.role=role != null ? role : user.role;
    user.firstName=firstName != null ? firstName : user.firstName;
    user.lastName=lastName != null ? lastName : user.lastName;
    user.username=username != null ? username : user.username;

    const updateUser = await user.save();
    return res.json({ updateUser });
}

export const deleteUser=async(req: Request,res: Response) => {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user){
        return res.status(404).json({ message: "User not found"});
    }

    user.status=false;
    user.deleteDate= new Date;

    const deleteUser = await user.save();
    return res.json({ deleteUser });
}