import { Request, Response } from 'express';
import { Menu } from './../models/MenuModel';

export const saveMenu = async (req: Request, res: Response) => {
  try {
    const { label, path, icon, roles } = req.body;

    // Validación simple
    if (!label || !path || !icon || !Array.isArray(roles)) {
      return res.status(400).json({ message: "Datos incompletos o inválidos." });
    }

    const newMenu = new Menu({
      label,
      path,
      icon,
      roles, // Array de ObjectId, se asume que ya son válidos
    });

    const savedMenu = await newMenu.save();

    return res.status(201).json({
      message: "Menú creado exitosamente",
      menu: savedMenu,
    });
  } catch (error) {
    console.error("Error al crear el menú:", error);
    return res.status(500).json({
      message: "Error interno al crear el menú",
      error,
    });
  }
};

export const getMenu = async (req: Request, res: Response) => {
    const menu = await Menu.find();
    if (menu.length === 0) {
        return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json(menu);
}
